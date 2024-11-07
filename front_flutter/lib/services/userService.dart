import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;  
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:html' as html;

//Futuramente: remover a parte web para virar apenas aplicativo mobile

class LoginResponse {
  final String token;


  const LoginResponse({
    required this.token,
    
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      token: json['token'] ?? ''
   
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

  Future<void> saveToken(LoginResponse loginResponse) async {
    final value = jsonEncode({
      'token': loginResponse.token,
    });

    if(kIsWeb){
      html.window.localStorage['user_token'] = value;
      print("Token armazenado no localStorage: ${html.window.localStorage['user_token']}");

    }else{
      final storage = FlutterSecureStorage();
      await storage.write(
        key: 'user_token',
        value: value
      );
    }
  }

  Future<LoginResponse?> signIn() async {
    try {
      final http.Client client = http.Client();
      final response = await client.post(
        Uri.parse('http://localhost:30001/sign-in'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );
      if(response.statusCode == 401){
        throw Exception("Email ou senha inválidos");
      }
      if(response.statusCode == 500){
        throw Exception("Erro no servidor");
      }
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
       
        if (responseData['token'] == null ) {
          throw Exception("Token de login ausente");
        }
        final loginResponse = LoginResponse.fromJson(responseData);
        await saveToken(loginResponse);

        return loginResponse;
      } else {
        throw Exception(jsonDecode(response.body)['message'] ?? 'Erro ao fazer o login');
      }
    } catch (e) {
      throw Exception("Erro ao fazer o login: $e");
    }
  }
}

class LogOut {
  Future<void> logOut() async {
    if (kIsWeb) {
      // Remove o token do localStorage para Web
      html.window.localStorage.remove('user_token');
      html.window.localStorage.remove('user_type');
      print("Token removido do localStorage para Web");
    } else {
      // Remove o token do FlutterSecureStorage para Android/iOS
      final storage = FlutterSecureStorage();
      await storage.delete(key: 'user_token');
      await storage.delete(key: 'user_type');
      print("Token removido do FlutterSecureStorage para Android/iOS");
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
      print("Erro ao fazer o cadastro: $e");
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
          'CNPJ': cnpj,
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
  Future<Map<String, dynamic>?> getUser() async { 
    try {
      String? userToken;
      if(kIsWeb){
        userToken = html.window.localStorage['user_token'];
      }else{
        final storage = FlutterSecureStorage();
        userToken = await storage.read(key: 'user_token');
      }
      if (userToken == null) {
        return {
          'data': null,
          'error': 'Token não encontrado',
        };
      }
      Map<String, dynamic> tokenData = jsonDecode(userToken);
      if (tokenData['token'] == null) {
        return {
          'data': null,
          'error': 'Token não encontrado na estrutura.',
        };
      }

      String token = tokenData['token'];
      final response = await http.get(
        Uri.parse('http://localhost:30000/profile'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
      );
      
      if (response.statusCode == 200) {
        final decodedresponse = jsonDecode(response.body);
       
        return decodedresponse;
      } else {
        throw Exception('Erro ao buscar o usuário: ${response.statusCode}');
      }

    }catch(e){
      print("Erro ao buscar o usuário: $e");
      return null;
    }
  }

}