import 'package:flutter/material.dart';
import 'package:front_flutter/pages/logInPage.dart';
import 'package:front_flutter/services/userService.dart';

class SignUpResPage extends StatefulWidget {
  @override
  State<SignUpResPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpResPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController(); 
  final nameController = TextEditingController();
  final cnpjController = TextEditingController();
  final emailConfirmController = TextEditingController();
  bool acceptTerms = false;
  String error = '';

  void handleSingUp(){
    final email = emailController.text;
    final password = passwordController.text;
    final name = nameController.text;
    final cnpj = cnpjController.text;
    final emailConfirm = emailConfirmController.text;

    final emailRegex = RegExp(r'\S+@\S+\.\S+'); // email@email.com
    final cnpjRegex = RegExp(r'^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$'); // XX.XXX.XXX/XXXX-XX
    final passwordRegex = RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'); // Senha123 
    
    if(email.isEmpty || password.isEmpty || name.isEmpty || cnpj.isEmpty || emailConfirm.isEmpty){
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
    }else if(!cnpjRegex.hasMatch(cnpj)){
      setState(() {
        error = 'CNPJ inválido';
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
      cnpj: cnpjController.text,
      cpf: '',
    );
    
    service.signUpRestaurant();
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
              controller: cnpjController,
              decoration: InputDecoration(
                labelText: 'CNPJ',
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