document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    // Função para mostrar mensagem de erro
    function mostrarMensagemDeErro(campo) {
        const spanErro = document.getElementById(`${campo.id}-error`);
        if (!spanErro) {
            const errorElement = document.createElement('span');
            errorElement.id = `${campo.id}-error`;
            errorElement.classList.add('error', 'text-danger');
            errorElement.textContent = campo.validationMessage;
            campo.parentNode.insertBefore(errorElement, campo.nextSibling);
        } else {
            spanErro.textContent = campo.validationMessage;
        }
        campo.classList.add('is-invalid');
    }

    // Função para salvar os dados no JSON Server
    async function salvarDadosNoServidor(dados) {
        try {
            const response = await fetch('http://localhost:3000/cadastros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            return response.ok;
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            return false;
        }
    }

    // Evento de submit do formulário
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evitar envio do formulário

        const firstName = document.getElementById('first-name');
        const secondName = document.getElementById('second-name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (!form.checkValidity()) {
            // Se o formulário não for válido, exibir mensagens de erro
            mostrarMensagemDeErro(firstName);
            mostrarMensagemDeErro(secondName);
            mostrarMensagemDeErro(email);
            mostrarMensagemDeErro(password);
            return;
        }

        // Criar objeto com os dados do formulário
        const dadosFormulario = {
            firstName: firstName.value,
            secondName: secondName.value,
            email: email.value,
            password: password.value
        };

        // Tentar salvar os dados no JSON Server
        const sucesso = await salvarDadosNoServidor(dadosFormulario);
        if (sucesso) {
            window.location.href = '/app/pages/login/index.html'; // Redirecionar para a página de login
        } else {
            console.error('Erro ao realizar o cadastro. Tente novamente.');
        }
    });
});