function openNotesModal(projectName) {
    const modal = document.getElementById('notes-modal');
    const titleInput = document.getElementById('note-title');

    titleInput.value = projectName + ': ';
    
    modal.style.display = 'flex';
}

function closeNotesModal() {
    document.getElementById('notes-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('notes-modal');
    if (event.target == modal) {
        closeNotesModal();
    }
}