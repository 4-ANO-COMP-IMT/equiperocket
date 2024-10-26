import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:front_flutter/main.dart';
import 'package:front_flutter/pages/profilePage.dart';
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
    
    final email = emailController.text;
    final password = passwordController.text;
        
    try{

      if (email.isEmpty || password.isEmpty) {
        setState(() {
          error = 'Preencha todos os campos';
          isLoading = false;
        });
        return;
      }
      final loginService = LoginAlbum(
        email: email, 
        password: password
        );
      final loginResponse = await loginService.singIn();
      if(loginResponse != null && mounted){
       Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => ProfilePage()),
            (Route<dynamic> route) => false,
       );
      }
    }catch(e){
      setState(() {
          error = 'Erro ao fazer login: ${e.toString()}';
          isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading:  IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pushAndRemoveUntil(
              context, 
              MaterialPageRoute(builder: (context) => MyHomePage()), 
              (Route<dynamic> route) => false
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
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 30),
            const Text(
              'Digite os dados de acesso nos campos abaixo.',
              style: TextStyle(
                color: Colors.white,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 30),
            CupertinoTextField(
              cursorColor: Colors.pinkAccent,
              padding: const EdgeInsets.all(15),
              placeholder: 'Email',
              controller: emailController,
              placeholderStyle: const TextStyle(
                color: Colors.white70,
                fontSize: 20,
              ),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 20,
              ),
              decoration: const BoxDecoration(
                color: Colors.white10,
                borderRadius: BorderRadius.all(
                  Radius.circular(7),
                ),
              ),
            ),
            const SizedBox(height: 5),
            CupertinoTextField(
              controller: passwordController ,
              cursorColor: Colors.pinkAccent,
              padding: const EdgeInsets.all(15),
              placeholder: 'Senha',
              placeholderStyle: const TextStyle(
                color: Colors.white70,
                fontSize: 20,
              ),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 20,
              ),
              decoration: const BoxDecoration(
                color: Colors.white10,
                borderRadius: BorderRadius.all(
                  Radius.circular(7),
                ),
              ),
            ),
            const SizedBox(height: 5),
            SizedBox(
              width: double.infinity,
              child: CupertinoButton(
                color: Colors.greenAccent,
                padding: EdgeInsets.all(17),
                child: Text(
                  'Acessar',
                  style: TextStyle(
                    color: Colors.black45,
                    fontSize: 20,
                    fontWeight: FontWeight.w600
                  ),
                ),
                onPressed: () {
                  if(!isLoading){
                    login();
                    print('Acessando...');
                  }
                },
              ),
            ),
            const SizedBox(height: 7),
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.white70,
                  width: 0.8,
                ),
                borderRadius: BorderRadius.all(
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
                  Navigator.pushAndRemoveUntil(
                    context, 
                    MaterialPageRoute(builder: (context) => ProfilePage()), 
                    (Route<dynamic> route) => false
                 );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
