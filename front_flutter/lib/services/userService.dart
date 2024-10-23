import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;  
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LoginResponse {
  final String token;
  final String name;
  final String type;

  const LoginResponse({
    required this.token,
    required this.name,
    required this.type,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      token: json['token'],
      name: json['name'],
      type: json['type'],
    );
  }
}
class LoginAlbum {
  final String email;
  final String password;

  const LoginAlbum({
    required this.email,
    required this.password,
  });
  
  Future<LoginResponse?> singIn(email, password) async {
    try{
      print(email);
      print(password);
      final response = await http.post(
        Uri.parse('http://localhost:30001/sign-in'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );
     
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        print(responseData);
        final loginResponse = LoginResponse.fromJson(responseData);
        const storage = FlutterSecureStorage();
        await storage.write(key: 'user_token', value: loginResponse.token);
        return loginResponse;
      } else {
        throw Exception(jsonDecode(response.body)['message'] ?? 'Erro ao fazer o login');
      }
    }catch(e){
      throw Exception("Erro ao fazer o login: $e");
    }
    
  }
}
class LogOut{
  final storage = FlutterSecureStorage();
  Future<String?> logOut() async {
    try {
      await storage.delete(key: 'user_token');
      return null;
    } catch (e) {
      throw Exception("Erro ao fazer o login: $e");
    }
    
  }

}
class SignUpAlbum {
  final String name;
  final String email;
  final String password;
  final String cpf;
  final String cnpj;

  const SignUpAlbum({
    required this.name,
    required this.email,
    required this.password,
    required this.cpf,
    required this.cnpj,
  });

  Future<String?> signUp() async{
    try {
      final response = await http.post(
        Uri.parse('http://localhost:30003/sign-up'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'name': name,
          'email': email,
          'password': password,
          'cpf': cpf,
        }),
      );
      if (response.statusCode == 200) {
        return null;
      } else {
        final Map<String, dynamic> responseBody = jsonDecode(response.body);
        return responseBody['message'] ?? 'Erro ao cadastrar usuário';
      }
        
    } catch (e) {
      return "Erro ao fazer o cadastro: $e";
    }
  } 
  Future<String?> signUpRestaurant() async{
    try {
      final response = await http.post(
        Uri.parse('http://localhost:30003/sign-up-restaurant'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'name': name,
          'email': email,
          'password': password,
          'cnpj': cnpj,
        }),
      );
      if (response.statusCode == 200) {
        return null;
      } else {
        final Map<String, dynamic> responseBody = jsonDecode(response.body);
        return responseBody['message'] ?? 'Erro ao cadastrar usuário';
      }
        
    } catch (e) {
      return "Erro ao fazer o cadastro: $e";
    }
  }
}

class UserAlbum{
  final storage = FlutterSecureStorage();
  Future<Map<String, dynamic>?> getUser() async { 
    try {
      final userToken = await storage.read(key: 'user_token');
      if (userToken == null) {
        return {
          'data': null,
          'error': 'Token não encontrado',
        };
      }
      Map<String, dynamic> tokenData = jsonDecode(userToken);
      String email = tokenData['email'];
      String token = tokenData['token'];
      String type = tokenData['type'];
      final response = await http.post(
        Uri.parse('http://localhost:30000/getProfileData'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'token': token,
          'type':  type,
        }),
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        return {
          'data': responseData,
          'error': null,
        };
      } else {
        final Map<String, dynamic> responseBody = jsonDecode(response.body);
        return {
          'data': null,
          'error': responseBody['message'] ?? 'Erro ao buscar o usuário',
        };
      }

    }catch(e){
      throw Exception("Erro ao buscar o usuário: $e");
    }
  }

}