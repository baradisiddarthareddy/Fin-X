from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import math

def sip_calculator(request):
    # Get parameters from the request
    principal = float(request.GET.get('principal', 0))
    rate = float(request.GET.get('rate', 0)) / 100  # Annual rate of return as a decimal
    tenure = int(request.GET.get('tenure', 0))

    # Calculate SIP for each year
    breakdown = []
    
    for year in range(1, tenure + 1):
        months = year * 12  # Total months for the current year
        monthly_rate = rate / 12  # Monthly rate of return
        
        # SIP formula: FV = P * ((1 + r)^n - 1) / r * (1 + r)
        future_value = principal * (((1 + monthly_rate) ** months - 1) / monthly_rate) * (1 + monthly_rate)
        
        # Add to breakdown list
        breakdown.append({
            'year': year,
            'futureValue': round(future_value, 2)  # Round to two decimal places
        })
    
    # Return the result as JSON
    return JsonResponse({'result': breakdown})


def compound_interest_calculator(request):
    # Get parameters from the request
    principal = float(request.GET.get('principal', 0))
    rate = float(request.GET.get('rate', 0)) / 100  # Annual rate as a decimal
    time = int(request.GET.get('time', 0))
    n = int(request.GET.get('compounds', 1))  # Number of compounding periods per year
    
    # Calculate compound interest for each year
    breakdown = []
    total_amount = principal
    for year in range(1, time + 1):
        # Compound Interest formula: A = P * (1 + (R / n))^(n * T)
        amount = principal * (1 + (rate / n)) ** (n * year)
        interest = amount - principal
        breakdown.append({
            'year': year,
            'amount': round(amount, 2),
            'interest': round(interest, 2)
        })
        # Update the principal for the next year
        principal = amount

    # Return the result as JSON
    total_amount = breakdown[-1]['amount']  # Final amount after the last year
    total_interest = breakdown[-1]['interest']  # Total compound interest
    return JsonResponse({
        'result': breakdown,
        'total_amount': round(total_amount, 2),
        'total_interest': round(total_interest, 2),
    })

def gst_calculator(request):
    # Get parameters from the request
    price = float(request.GET.get('price', 0))
    gst_rate = float(request.GET.get('gstRate', 0))
    calculation_type = request.GET.get('calculationType', 'exclusive')  # default is 'exclusive'

    if calculation_type == "exclusive":
        # Exclusive GST Calculation
        gst_amount = price * (gst_rate / 100)
        final_price = price + gst_amount
        result = {
            'gstAmount': round(gst_amount, 2),
            'finalPrice': round(final_price, 2),
        }
    elif calculation_type == "inclusive":
        # Inclusive GST Calculation
        gst_amount = price * gst_rate / (100 + gst_rate)
        original_price = price - gst_amount
        result = {
            'gstAmount': round(gst_amount, 2),
            'finalPrice': round(original_price, 2),
        }

    return JsonResponse({'result': result})

def fd_calculator(request):
    # Get parameters from the request
    principal = float(request.GET.get('principal', 0))
    interest_rate = float(request.GET.get('interestRate', 0)) / 100  # Convert to decimal
    time_period = float(request.GET.get('timePeriod', 0)) / 12  # Convert months to years
    compounding_frequency = request.GET.get('compoundingFrequency', 'monthly')
    
    # Set the number of compounding periods per year based on frequency
    if compounding_frequency == 'monthly':
        n = 12
    elif compounding_frequency == 'quarterly':
        n = 4
    elif compounding_frequency == 'half-yearly':
        n = 2
    else:  # yearly
        n = 1
    
    # Compound Interest Formula
    amount = principal * math.pow(1 + (interest_rate / n), n * time_period)
    maturity_amount = round(amount, 2)
    interest_earned = round(maturity_amount - principal, 2)
    
    # Generate Month-by-Month Breakdown
    breakdown = []
    current_balance = principal
    monthly_interest_rate = interest_rate / 12  # Monthly interest rate
    
    for month in range(1, int(time_period * 12) + 1):
        interest_earned_this_month = current_balance * monthly_interest_rate
        current_balance += interest_earned_this_month
        breakdown.append({
            'month': month,
            'startingBalance': round(current_balance - interest_earned_this_month, 2),
            'interestEarned': round(interest_earned_this_month, 2),
            'endingBalance': round(current_balance, 2),
        })
    
    # Prepare response data
    result = {
        'maturityAmount': maturity_amount,
        'interestEarned': interest_earned,
        'breakdown': breakdown
    }

    return JsonResponse({'result': result})


def rd_calculator(request):
    # Get parameters from the request
    monthly_deposit = float(request.GET.get('monthlyDeposit', 0))
    interest_rate = float(request.GET.get('interestRate', 0)) / 100  # Convert to decimal
    investment_period = int(request.GET.get('investmentPeriod', 0))  # in years

    # Convert annual interest rate to quarterly interest rate
    r = interest_rate / 4  # Quarterly interest rate
    # Total number of months
    n = investment_period * 12  # Number of months

    # Calculate the maturity amount using the RD formula
    # M = P * ((1 + r)^n - 1) / (1 - (1 + r)^(-1/3))
    maturity_amount = monthly_deposit * (((1 + r) ** n - 1) / (1 - (1 + r) ** (-1 / 3)))

    # Calculate interest earned
    interest_earned = round(maturity_amount - monthly_deposit * n, 2)

    # Calculate the breakdown (quarter by quarter)
    quarters = investment_period * 4  # Total quarters
    breakdown = []
    current_balance = 0

    for quarter in range(1, quarters + 1):
        # Deposit for the quarter
        current_balance += monthly_deposit * 3  # 3 months in each quarter
        # Interest for the quarter (based on the current balance)
        interest_earned_this_quarter = current_balance * r
        # Update current balance with interest
        current_balance += interest_earned_this_quarter
        breakdown.append({
            'quarter': quarter,
            'startingBalance': round(current_balance - interest_earned_this_quarter, 2),
            'interestEarned': round(interest_earned_this_quarter, 2),
            'endingBalance': round(current_balance, 2),
        })

    # Prepare response data
    result = {
        'maturityAmount': round(maturity_amount, 2),
        'interestEarned': interest_earned,
        'breakdown': breakdown
    }

    return JsonResponse({'result': result})

def mis_calculator(request):
    # Get parameters from the request
    principal_amount = float(request.GET.get('principalAmount', 0))
    interest_rate = float(request.GET.get('interestRate', 0))  # In percentage
    investment_period = int(request.GET.get('investmentPeriod', 0))  # In years

    # Calculate monthly interest using the formula
    monthly_interest = (principal_amount * interest_rate) / (12 * 100)

    # Prepare the result data
    result = {
        'monthlyInterest': round(monthly_interest, 2)
    }

    return JsonResponse({'result': result})

def simple_interest_calculator(request):
    # Get parameters from the request
    principal_amount = float(request.GET.get('principalAmount', 0))
    interest_rate = float(request.GET.get('interestRate', 0))
    time_period = int(request.GET.get('timePeriod', 0))

    # Calculate Simple Interest using the formula
    simple_interest = (principal_amount * interest_rate * time_period) / 100
    total_amount = principal_amount + simple_interest

    # Prepare the result data
    result = {
        'simpleInterest': round(simple_interest, 2),
        'totalAmount': round(total_amount, 2)
    }

    return JsonResponse({'result': result})

def ssy_maturity_calculator(request):
    # Get parameters from the request
    annual_deposit = float(request.GET.get('annualDeposit', 0))
    interest_rate = float(request.GET.get('interestRate', 8.2))
    years_of_deposit = int(request.GET.get('yearsOfDeposit', 15))

    # Compound interest formula for each deposit
    maturity_amount = 0
    total_investment = annual_deposit * years_of_deposit

    for year in range(years_of_deposit):
        years_compounded = years_of_deposit - year
        # Apply compound interest formula: A = P * (1 + r/100) ^ n
        future_value = annual_deposit * math.pow(1 + (interest_rate / 100), years_compounded)
        maturity_amount += future_value

    total_interest = maturity_amount - total_investment

    # Prepare the result data
    result = {
        'maturityAmount': round(maturity_amount, 2),
        'totalInterest': round(total_interest, 2)
    }

    return JsonResponse({'result': result})

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Use create_user to ensure password is hashed
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Registration View
class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        # Use RegisterSerializer to validate and save the user
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Create user with validated data
            token, created = Token.objects.get_or_create(user=user)  # Generate token
            if created:
                print("A new token was created!")
            else:
                print("The token already exists.")
            return Response({
                "token": token.key,
                "message": "User registered successfully!"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Login View
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        # Validate and authenticate the user using the LoginSerializer
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                # Generate token if user exists
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    "token": token.key,
                    "message": "Login successful!"
                }, status=status.HTTP_200_OK)
            return Response({
                "error": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)