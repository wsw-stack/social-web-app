export const fetchCurrentUser = async () => {
    const response: any = await fetch(
        "http://localhost:8000/api/sessions",
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const responseData = await response.json();
    if (responseData.session) {
        const userId = JSON.parse(responseData.session.session).user;
        return userId
    } else {
        return null
    }
}