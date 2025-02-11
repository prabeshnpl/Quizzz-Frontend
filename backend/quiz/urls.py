from django.urls import path,include
from .views import Api
from rest_framework.routers import DefaultRouter
from .views import Register,Login
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'',Api)

urlpatterns = [
    path('view_all/',include(router.urls),name='api_all'),
    path('register/',Register.as_view(),name='register'),
    path('login/',Login.as_view(),name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]