
export const swDev = () => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(() => {
            console.log("service worker registered successfully")
        }, (err) => {
            console.log("Error: ", err)
        })
    } else{
        console.log("Service worker not found")
    }
}