from django.shortcuts import render
from rest_framework import viewsets,status
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate,login,logout
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
class Api(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    

class Register(APIView):
    def get(self,request):
        return Response({'message':'Hello from backend'})
    
    def post(self,request,*args,**kwargs):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                a = serializer.save()
                return Response({'message':True})
            else:
                raise ValueError(serializer.errors)
        
        except ValueError as e:
            return Response({'message':str(e)})
        
        except Exception as e:
            return Response({"message":str(e)})

class Login(APIView):
    def get(self,request):
        return Response({'message':'login please'})
    def post(self,request,*args,**kwargs):
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            if not username or not password:
                return Response({"message":"Username and password required"},status=status.HTTP_400_BAD_REQUEST)
            
            user = authenticate(username=username,password=password)

            if user:
                login(request,user)

                # create token for authentication using simple_jwt
                # Note the time validity of these tokens are defined in settings.py
                refresh = RefreshToken.for_user(user)
                return Response({'message':True,"access": str(refresh.access_token),
                "refresh": str(refresh)},status=status.HTTP_200_OK)
            
            return Response({"message":"Invalid Username or Password"},status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response({"message":str(e)})