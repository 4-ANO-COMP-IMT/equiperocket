class User {
  final String name;
  final String email;
  final String cpf; 

  User({
    required this.name,
    required this.email,
    required this.cpf,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
      cpf: json['cpf'],
    );
  }
}