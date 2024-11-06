import 'dart:async';
import 'package:flutter/material.dart';
import 'package:front_flutter/components/navbar.dart';
import 'package:front_flutter/pages/profilePage.dart';
import 'package:front_flutter/pages/signUpPage.dart';
import 'package:front_flutter/services/userService.dart';

class LoginPage extends StatefulWidget {
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isLoading = false;
  String? error;

  Future<void> login() async {
    setState(() {
      isLoading = true; // Iniciar o estado de carregamento
      error = null; // Limpar mensagem de erro
    });

    final email = emailController.text.trim();
    final password = passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      setState(() {
        error = 'Preencha todos os campos';
        isLoading = false;
      });
      return;
    }

    final loginService = LoginAlbum(
      email: email,
      password: password,
    );

    // Definindo um timeout de 5 segundos para a tentativa de login
    try {
      final loginFuture = loginService.signIn();
      final loginResponse = await loginFuture.timeout(
        Duration(seconds: 5),
        onTimeout: () {
          throw TimeoutException(
              "Tempo de espera esgotado. Tente novamente mais tarde.");
        },
      );

      if (loginResponse != null && mounted) {
        Navigator.pop(context);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ProfilePage()),
        );
      } else {
        setState(() {
          error = 'Erro ao fazer login. Verifique suas credenciais.';
        });
      }
    } on TimeoutException catch (_) {
      setState(() {
        error =
            "Tempo de espera esgotado. Tente novamente mais tarde."; // Mensagem de timeout
      });
    } catch (e) {
      setState(() {
        print(error);
      });
    } finally {
      setState(() {
        isLoading = false; // Finalizar o estado de carregamento
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
      ),
      body: Container(
        padding: const EdgeInsets.all(20.0),
        color: const Color(0xFFF8F9FA), // Cor de fundo
        child: Center(
          child: Container(
            padding: const EdgeInsets.all(20.0),
            decoration: BoxDecoration(
              color: const Color(0xFF171412), // Cor de fundo do card
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 8.0,
                  offset: const Offset(0, 4), // Sombra abaixo do card
                ),
              ],
            ),
            constraints: BoxConstraints(maxWidth: 400, minWidth: 300), // Largura máxima do card
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Login',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        color: const Color(0xFFDCDCDC),
                      ),
                ),
                const SizedBox(height: 20),
                _buildLabel('Email:'),
                TextField(
                  controller: emailController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 10),
                _buildLabel('Senha:'),
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    await login();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF8BF337),
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                  ),
                  child: const Text('Entrar', style: TextStyle(color: Colors.white)),
                ),
                const SizedBox(height: 10),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => SignUpPage()),
                    );
                  },
                  child: const Text(
                    "Não tem uma conta? Crie sua conta",
                    style: TextStyle(
                      color: Color(0xFF8BF337),
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 20, // Ajuste o tamanho da fonte conforme necessário
        color: Color(0xFF8BF337), // Cor do texto
        fontWeight: FontWeight.bold, // Negrito
      ),
    );
  }
}