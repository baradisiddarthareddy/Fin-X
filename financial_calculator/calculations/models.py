# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Insurance(models.Model):
    INSURANCE_TYPES = [
        ('Car', 'Car Insurance'),
        ('Home', 'Home Insurance'),
        ('Health', 'Health Insurance'),
        ('Life', 'Life Insurance'),
        ('Term', 'Term Insurance'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    insurance_type = models.CharField(max_length=20, choices=INSURANCE_TYPES)
    policy_number = models.CharField(max_length=50)
    provider = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.insurance_type} - {self.policy_number}"
