function showSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';

}
function hideSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

function cv() {
    alert('קורות החיים יעלו לאתר בהמשך');
}

function showHTML() {
    document.getElementById('articleHTML').style.display = 'flex';
    document.getElementById('articleJS').style.display = 'none';
}

function showJS() {
    document.getElementById('articleJS').style.display = 'flex';
    document.getElementById('articleHTML').style.display = 'none';
}