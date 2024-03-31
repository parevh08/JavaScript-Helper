function getAge(date) {
    const today = new Date();
    const birthDate = new Date(date.split("T")[0]);

    let age = today.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
        age--;
    }

    return age;
}