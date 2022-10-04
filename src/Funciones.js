export function valorCookie(nombre){
      let valor = document.cookie;

      if (valor){
            valor = valor.split('; ')
            .find((row) => row.startsWith(nombre + "="))
            .split('=')[1];
      }
      
      return valor;
}

export function borrarCookie(nombre){
      let cookie = document.cookie.split('; ')
      .find((row) => row.startsWith(nombre + "="))
      .split('=')[1];
      
      document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// export function encriptar(texto){
//       if (!texto) return null;
//       let encriptado = "";
//       let partes = texto.split('=');
//       encriptado = texto[0];
//       for (let i = partes[1].length - 1; i > -1; i--){
//             let caracter = String.fromCharCode(texto.charCodeAt(i) + 1);
//             encriptado += caracter;
//       }
//       return encriptado;
// }

// export function desencriptar(texto){
//       if (!texto) return null;
//       let desencriptado = "";
//       let partes = texto.split('=');
//       desencriptado = texto[0];
//       for (let i = partes[1].length - 1; i > -1; i--){
//             let caracter = String.fromCharCode(texto.charCodeAt(i) - 1);
//             desencriptado += caracter;
//       }
// }

// export function obtenerToken(){
//       let usuario = valorCookie("usuario");
//       if (!usuario) return null;
//       return usuario.split("|")[2].split(":")[1];
// }

export function armarNotifMedicamentos(meds){
      // med, cantDias, trat.Descripcion
      if (meds && meds.length != 0){
            let cantMeds = meds.length;
            let texto = "<h3>Bajo stock de " + cantMeds + " medicamento";
            if (cantMeds > 1) texto += "s";
            texto += "</h3><p>"

            for (let i = 0; i < cantMeds; i++){
                  
            }
      }
}

export function armarNotifRecetas(recs){

}