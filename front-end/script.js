// handles dropdown information 

function toggleDropdown(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector(".arrow");

    if (content.style.display === "block") {
        content.style.display = "none";
        element.classList.remove("open");
    } else {
        content.style.display = "block";
        element.classList.add("open");
    }
}


// handles form submission
document.getElementById("anamnese").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    canvas.toBlob(async (blob) => {
        if (!blob) {
            alert("Erro ao capturar a assinatura.");
            return;
        }
    
        formData.append("signature", blob, "signature.png");
    
        try {
            const response = await fetch('http://localhost:3000/anamnese', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    
            const resultado = await response.json();
            alert(resultado.error || 'Formulário enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Ocorreu um erro ao enviar o formulário.');
        }
    });
});