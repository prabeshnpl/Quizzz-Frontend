from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField()

    class Meta():
        model = CustomUser
        fields = ['id','username','password']
        # extra_kwargs = {'password': {'write_only': True}} 
    
    def create(self, validated_data):
        user = CustomUser(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self,instance,validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            validated_data.pop('password',None)
        return super().update(instance, validated_data)

        
