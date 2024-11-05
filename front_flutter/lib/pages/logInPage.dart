import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:front_flutter/main.dart';
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
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => ProfilePage()),
          (Route<dynamic> route) => false,
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
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pushAndRemoveUntil(
              context,
              MaterialPageRoute(builder: (context) => MyHomePage()),
              (Route<dynamic> route) => false,
            );
          },
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(27),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.deepPurple,
              Colors.pinkAccent,
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 80),
              const Text(
                'Digite os dados de acesso nos campos abaixo.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 40),
              CupertinoTextField(
                cursorColor: Colors.pinkAccent,
                padding: const EdgeInsets.all(15),
                placeholder: 'Email',
                controller: emailController,
                keyboardType: TextInputType.emailAddress,
                autocorrect: false,
                placeholderStyle: const TextStyle(
                  color: Colors.white70,
                  fontSize: 18,
                ),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                ),
                decoration: const BoxDecoration(
                  color: Colors.white10,
                  borderRadius: BorderRadius.all(
                    Radius.circular(7),
                  ),
                ),
              ),
              const SizedBox(height: 15),
              CupertinoTextField(
                controller: passwordController,
                cursorColor: Colors.pinkAccent,
                padding: const EdgeInsets.all(15),
                placeholder: 'Senha',
                obscureText: true,
                autocorrect: false,
                placeholderStyle: const TextStyle(
                  color: Colors.white70,
                  fontSize: 18,
                ),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                ),
                decoration: const BoxDecoration(
                  color: Colors.white10,
                  borderRadius: BorderRadius.all(
                    Radius.circular(7),
                  ),
                ),
              ),
              const SizedBox(height: 15),
              if (error != null)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  alignment: Alignment.centerLeft,
                  child: Text(
                    error!,
                    style: const TextStyle(
                      color: Colors.redAccent,
                      fontSize: 16,
                    ),
                  ),
                ),
              const SizedBox(height: 15),
              SizedBox(
                width: double.infinity,
                child: CupertinoButton(
                  color: isLoading ? Colors.grey : Colors.greenAccent,
                  padding: const EdgeInsets.all(17),
                  onPressed: isLoading
                      ? null
                      : () async {
                          await login();
                        },
                  child: isLoading
                      ? const CupertinoActivityIndicator(
                          color: Colors.black45,
                        )
                      : const Text(
                          'Acessar',
                          style: TextStyle(
                            color: Colors.black45,
                            fontSize: 20,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                ),
              ),
              const SizedBox(height: 15),
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.white70,
                    width: 0.8,
                  ),
                  borderRadius: const BorderRadius.all(
                    Radius.circular(7),
                  ),
                ),
                child: CupertinoButton(
                  child: const Text(
                    "Crie sua conta",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => SignUpPage()), // Supondo que exista uma página de cadastro
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
