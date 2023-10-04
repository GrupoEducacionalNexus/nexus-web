import { Howl, Howler } from 'howler';
import Sound from '../sounds/notificacao.mp3'; // Insira o caminho do arquivo de som aqui

export function notificar() {
    const somNotificacao = new Howl({
      src: [Sound], // Insira o caminho do arquivo de som aqui
    });
    somNotificacao.play();
}