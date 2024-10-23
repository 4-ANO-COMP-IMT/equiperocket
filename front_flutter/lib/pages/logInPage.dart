import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:front_flutter/services/userService.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
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

    if (email.isEmpty || password.isEmpty) {
      setState(() {
        error = 'Preencha todos os campos';
        isLoading = false;
      });
      return;
    }
    try{
      final loginService = LoginAlbum(email: email, password: password);
      final loginResponse = await loginService.singIn(email, password);
      
      if(loginResponse != null && mounted){
        Navigator.pushNamed(context, '/profile');
      }
    }catch(e){
      setState(() {
        error = e.toString();
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
      ),
      body: Container(
        width: MediaQuery.of(context).size.width,
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
            const CupertinoTextField(
              cursorColor: Colors.pinkAccent,
              padding: EdgeInsets.all(15),
              placeholder: 'Email',
              placeholderStyle: TextStyle(
                color: Colors.white70,
                fontSize: 20,
              ),
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
              ),
              decoration: BoxDecoration(
                color: Colors.white10,
                borderRadius: BorderRadius.all(
                  Radius.circular(7),
                ),
              ),
            ),
            const SizedBox(height: 5),
            const CupertinoTextField(
              cursorColor: Colors.pinkAccent,
              padding: EdgeInsets.all(15),
              placeholder: 'Senha',
              placeholderStyle: TextStyle(
                color: Colors.white70,
                fontSize: 20,
              ),
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
              ),
              decoration: BoxDecoration(
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
                  Navigator.pushNamed(context, '/register');
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
