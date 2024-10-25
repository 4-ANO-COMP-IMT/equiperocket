import 'package:flutter/material.dart';
import 'package:front_flutter/pages/logInPage.dart';
import 'package:front_flutter/services/userService.dart';

class SignUpPage extends StatefulWidget {
  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController(); 
  final nameController = TextEditingController();
  final cpfController = TextEditingController();
  final emailConfirmController = TextEditingController();
  bool acceptTerms = false;
  String error = '';

  void handleSingUp(){
    final email = emailController.text;
    final password = passwordController.text;
    final name = nameController.text;
    final cpf = cpfController.text;
    final emailConfirm = emailConfirmController.text;

    final emailRegex = RegExp(r'\S+@\S+\.\S+'); // email@email.com
    final cpfRegex = RegExp(r'^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$'); // 000.000.000-00
    final passwordRegex = RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'); // Senha123 
    
    if(email.isEmpty || password.isEmpty || name.isEmpty || cpf.isEmpty || emailConfirm.isEmpty){
      setState(() {
        error = 'Preencha todos os campos';
      });
      return;
    }else if(email != emailConfirm){
      setState(() {
        error = 'Os emails não são iguais';
      });
      return;
    }else if(!emailRegex.hasMatch(email)){
      setState(() {
        error = 'Email inválido';
      });
      return;
    }else if(!cpfRegex.hasMatch(cpf)){
      setState(() {
        error = 'CPF inválido';
      });
      return;
    }else if(!passwordRegex.hasMatch(password)){
      setState(() {
        error = 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula e um número';
      });
      return;
    }else if(!acceptTerms){
      setState(() {
        error = 'Aceite os termos';
      });
      return;
    }else {
      setState(() {
        error = '';
        signUp();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Cadastrado com sucesso'),
          ),
        );
        Navigator.pushAndRemoveUntil(
          context, 
          MaterialPageRoute(builder: (context) => LoginPage()), 
          (Route<dynamic> route) => false
        );
      });
    }
  }
  void signUp(){
    final service = SignUpAlbum(
      name: nameController.text,
      email: emailController.text,
      password: passwordController.text,
      cpf: cpfController.text,
      cnpj: '',
    );
    
    service.signUp();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Cadastro'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(
                labelText: 'Nome',
              ),
            ),
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: 'Email',
              ),
            ),
            TextField(
              controller: emailConfirmController,
              decoration: InputDecoration(
                labelText: 'Confirme o email',
              ),
            ),
            TextField(
              controller: cpfController,
              decoration: InputDecoration(
                labelText: 'CPF',
              ),
            ),
            TextField(
              controller: passwordController,
              decoration: InputDecoration(
                labelText: 'Senha',
              ),
              obscureText: true,
            ),
            Row(
              children: [
                Checkbox(
                  value: acceptTerms,
                  onChanged: (value) {
                    setState(() {
                      acceptTerms = value!;
                    });
                  },
                ),
                Text('Aceito os termos')
              ],
            ),
            if(error.isNotEmpty)
              Text(
                error,
                style: TextStyle(
                  color: Colors.red,
                ),
              ),
            ElevatedButton(
              onPressed: handleSingUp, 
              child: Text('Cadastrar'),
            ),
          ],
        ),       
      ),
    );
  }
}