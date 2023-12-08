export function capitalizeFirstLetter(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

export function isValidImage(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = () => {
            resolve(true);
        };
        image.onerror = () => {
            resolve(false);
        };
        image.src = url;
    });
}
