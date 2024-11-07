class User {
  final String name;
  final String email;
  final String cpf;
  final String cnpj;

  User({
    required this.name,
    required this.email,
    required this.cpf,
    required this.cnpj,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
      cpf: json['cpf'],
      cnpj: json['cnpj'],

    );
  }

}
