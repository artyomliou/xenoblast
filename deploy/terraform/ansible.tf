resource "local_file" "ansible_inventory" {
  filename = "../ansible/inventory.ini"
  content  = <<EOT
[ec2]
${aws_instance.main.public_ip} ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/deployer.pem
EOT

}

resource "null_resource" "run_ansible" {
  depends_on = [local_file.ansible_inventory]

  provisioner "local-exec" {
    command = <<EOT
      cd ../ansible && ansible-playbook -i inventory.ini playbooks/upload_files.yml
    EOT
  }
}
