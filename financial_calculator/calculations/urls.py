from django.urls import path
from . import views
from .views import RegisterUserView, LoginView

urlpatterns = [
    path('sip/', views.sip_calculator, name='sip'),
    path('compound_interest/', views.compound_interest_calculator, name='compound_interest'),
    path('gst_calculator/', views.gst_calculator, name='gst_calculator'),
    path('fd_calculator/', views.fd_calculator, name='fd_calculator'),
    path('rd_calculator/', views.rd_calculator, name='rd_calculator'),
    path('mis_calculator/', views.mis_calculator, name='mis_calculator'),
    path('simple_interest/', views.simple_interest_calculator, name='simple_interest_calculator'),
    path('ssy_maturity/', views.ssy_maturity_calculator, name='ssy_maturity_calculator'),
    
    # Ensure the correct path for registration and login
    path('api/register/', RegisterUserView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),  # Ensure this path is correct too
]
