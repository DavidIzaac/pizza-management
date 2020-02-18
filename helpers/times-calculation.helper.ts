export default function getMinutesAndSecondes(datetime_in,datetime_out){
    let delta = Math.abs(datetime_in - datetime_out) / 1000;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const secondes = Math.floor(delta % 60);
    return {minutes,secondes}
}
    

