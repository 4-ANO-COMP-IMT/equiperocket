import 'package:flutter/material.dart';

class ButtonGroup extends StatelessWidget {
  final VoidCallback onUpdate;

  const ButtonGroup({super.key, required this.onUpdate});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: onUpdate,
          style: ElevatedButton.styleFrom(
            foregroundColor: const Color(0xFF002F52), backgroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(5),
            ),
            side: BorderSide.none,
          ),
          child: const Text(
            'Atualizar',
            style: TextStyle(color: Color(0xFF002F52)),
          ),
        ),
      ],
    );
  }
}
