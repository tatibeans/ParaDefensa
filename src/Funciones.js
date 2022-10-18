export function valorCookie(nombre) {
      let valor = document.cookie;

      if (valor != null && valor != "") {
            valor = valor
                  .split("; ")
                  .find((row) => row.startsWith(nombre + "="))
                  .split("=")[1];
      }

      return valor;
}

export function borrarCookie(nombre) {
      let cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(nombre + "="))
            .split("=")[1];

      document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function armarNotifMedicamentos(meds) {
      // med, cantDias, trat.Descripcion

      if (meds && meds.length != 0) {
            let cantMeds = meds.length;
            let texto = "Bajo stock de " + cantMeds + " medicamento";
            if (cantMeds > 1) { texto += "s"; }
            texto += "\n";

            let tenner = "10 días restantes de ";
            let tres = "3 días restantes de ";
            let hayDiez = false;
            let hayTres = false;

            for (let i = 0; i < cantMeds; i++) {
                  let desc = meds[i].med.Nombre + " (" + meds[i].trat + ")";
                  if (i != cantMeds) desc += ", ";
                  if (meds[i].dias == 10) {
                        tenner += desc;
                        hayDiez = true;
                  } else {
                        tres += desc;
                        hayTres = true;
                  }
            }

            if (hayTres) {
                  texto += tres;
                  if (hayDiez) texto += "\n";
            }
            if (hayDiez) texto += tenner;

            return texto;
      }
      return null;
}

export function armarNotifRecetas(recs) {
      if (recs && recs.length != 0) {
            let cantRecs = recs.length;
            let texto = "Próximo vencimiento de " + cantRecs + " receta";
            if (cantRecs > 1) texto += "s";

            let tenner = "En 10 días: ";
            let tres = "En 3 días: ";
            let hayDiez = false;
            let hayTres = false;

            for (let i = 0; i < cantRecs; i++) {
                  let desc = recs[i].rec.Sustancia + " (" + recs[i] + ")";
                  if (i != cantRecs) desc += ", ";
                  if (recs[i].dias == 10) {
                        tenner += desc;
                        hayDiez = true;
                  } else {
                        tres += desc;
                        hayTres = true;
                  }
            }

            if (hayTres) {
                  texto += tres;
                  if (hayDiez) texto += "\n";
            }
            if (hayDiez) texto += tenner;

            return texto;
      }
      return null;
}

async function buscarAlertas(ci, centro, token) {
      const meds = await fetch(
            `https://calisto-hilosdeplata.azurewebsites.net/api/PWA/StockMedicamentos?centro=${centro}&cedula=${ci}&token=${token}`
      );
      const resultado = await meds.json();


      const recetas = await fetch(
            `https://calisto-hilosdeplata.azurewebsites.net/api/PWA/VenceReceta?centro=${centro}&cedula=${ci}&token=${token}`
      );

      const resultadoRecetas = await recetas.json();

      let recNotif = armarNotifRecetas(resultadoRecetas);
      let medNotif = armarNotifMedicamentos(resultado);
      let textoEntero = "";
      if (recNotif != null) textoEntero += recNotif;
      if (medNotif != null) textoEntero += medNotif;
      return textoEntero;

}

// const recetas = new Promise(async () =>
//       await fetch(`https://calisto-hilosdeplata.azurewebsites.net/api/PWA/VenceReceta?centro=${centro}&cedula=${ci}&token=${token}`).then(r => {
//             if (r !== "No hay recetas") r.json()
//       }).then(data => {
//             if (data !== null && data !== undefined && data !== "") armarNotifRecetas(data)
//       })
// );
// const meds = new Promise(async () =>
//       await fetch(`https://calisto-hilosdeplata.azurewebsites.net/api/PWA/StockMedicamentos?centro=${centro}&cedula=${ci}&token=${token}`)
//       .then(r => {

//       r.json();

// }).then(data => {
//       if (data !== "No hay medicamentos") {
//        console.log(data);
//       armarNotifMedicamentos(data)}
// }));
// const promesas = await Promise.all([recetas, meds]).then(console.log()).then(data => { return data });

export async function notificar(evt, ci, centro, token) {
      evt.preventDefault();
      if (!window.Notification) {
            console.log("Este navegador no es compatible con las notificaciones push.");
      }

      if (Notification.permission == "granted") {
            let notifs = await buscarAlertas(ci, centro, token);
            if (notifs != "")
                  new Notification(notifs);
      } else if (
            Notification.permission != "denied" ||
            Notification.permission == "default"
      ) {
            Notification.requestPermission(async function (permission) {
                  if (Notification.permission == "granted") {
                        let notifs = await buscarAlertas(ci, centro, token);
                        if (notifs != "")
                              new Notification(notifs);
                  }
            });
      }
}

export function yaEmpeceTimer() { }
