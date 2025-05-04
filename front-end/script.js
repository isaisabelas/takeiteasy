
document.getElementById("anamnese").addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("Formulário foi submetido");

    const formData = Object.fromEntries(new FormData(event.target).entries());

    // Use a URL baseada no ambiente (se estiver no Render, usará o domínio correto)
    const apiUrl = window.location.origin + '/anamnese';

    try { // Enviando os dados para o servidor
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Verificando se a resposta é JSON
        const text = await response.text(); // Lê a resposta como texto
        let resultado;
        try {
            resultado = JSON.parse(text); // Tenta parsear o texto como JSON
        } catch (jsonError) {
            throw new Error('Resposta não é JSON');
        }

        // Verifica se a resposta contém as propriedades esperadas
        if (resultado.success) {
            alert(resultado.message || 'Formulário enviado com sucesso!');
        } else {
            alert(resultado.error || 'Ocorreu um erro ao enviar o formulário.');
        }

    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Ocorreu um erro ao enviar o formulário. Verifique sua conexão ou tente novamente mais tarde.');
    }
});
