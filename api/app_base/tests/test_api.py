from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from record.models import AudioClip

class BaseAudioClipTests(APITestCase):
    def setUp(self):
        self.bob = User.objects.create(username='bob')
        self.billy = User.objects.create(username='billy')

    def test_create_clip(self):
        """
        Ensure we can create a new clip object
        """
        url = reverse('clips-list')
        data = {'name':'Awww yea'}
        self.client.force_authenticate(user=self.bob)

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AudioClip.objects.count(), 1)
        self.assertEqual(AudioClip.objects.get().name, 'Awww yea')

    def test_create_clip_requires_authentication(self):
        url = reverse('clips-list')
        data = {'name':'Awww yea'}

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 403)


    def test_clip_is_owner_or_read_only(self):
        bobsclip = AudioClip.objects.create(user=self.bob, name="bob's clip") 
        url = reverse('clips-detail', kwargs={'pk':bobsclip.pk})

        self.client.force_authenticate(user=self.bob)
        response = self.client.put(url, {'name':'bob is the best'}, format='json')

        self.assertEqual(response.status_code, 200)
        bobsclip.refresh_from_db()
        self.assertEqual(bobsclip.name, "bob is the best")

        self.client.force_authenticate(user=self.billy)
        response = self.client.put(url, {'name':'billy is the best'}, format='json')

        self.assertEqual(response.status_code, 403)
        self.assertEqual(bobsclip.name, "bob is the best")

    def test_duplicate_user_clipname_returns_400_status(self):
         """
         Ensure the user is alerted it cannot create duplicate clips names
         """
         url = reverse('clips-list')
         data = {'name': 'dupped'}
         self.client.force_authenticate(user=self.bob)

         clip1 = self.client.post(url, data, format='json')
         clip2 = self.client.post(url, data, format='json')

         self.assertEqual(clip1.status_code, status.HTTP_201_CREATED)
         self.assertEqual(clip2.status_code, status.HTTP_400_BAD_REQUEST)
         self.assertEqual(AudioClip.objects.count(), 1)

class UserAudioClipTests(APITestCase):
    """
    Tests for /user/{username}/clips/{clipname}
    """
    def setUp(self):
        self.bob = User.objects.create(username='bob')
        self.billy = User.objects.create(username='billy')

    def test_user_clip_route_is_only_editable_by_the_owner(self):
        bobsclip = AudioClip.objects.create(user=self.bob, name='bobs clip')
        url = reverse('user-clips-detail', kwargs={'user_username': self.bob.username, 'name': bobsclip.name})
        self.client.force_authenticate(user=self.billy)

        clip = self.client.put(url, {'name':'bob smells'})
        bobsclip.refresh_from_db()

        self.assertEqual(clip.status_code, 403)
        self.assertNotEqual(bobsclip.name, 'bob smells')

        self.client.force_authenticate(user=self.bob)
        clip = self.client.put(url, {'name':'bob rox'})
        bobsclip.refresh_from_db()

        self.assertEqual(clip.status_code, 200)
        self.assertEqual(bobsclip.name, 'bob rox')
