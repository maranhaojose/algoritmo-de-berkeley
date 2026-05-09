const resultado = document.getElementById("resultado");

const exceptionBox =
document.getElementById("exception-box");

const inputsHorarios =
document.getElementById("inputs-horarios");

const inputsEnvio =
document.getElementById("inputs-envio");

const tituloEsquerda =
document.getElementById("titulo-esquerda");

let dadosSync = null;


// ===========================
// Utils
// ===========================

function horaParaMinutos(hora) {

    const [h, m] = hora.split(":").map(Number);

    return h * 60 + m;
}

function minutosParaHora(total) {

    total = (total + 1440) % 1440;

    const h = Math.floor(total / 60);
    const m = total % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function mostrarErro(msg) {

    exceptionBox.classList.remove("hidden");

    exceptionBox.innerText = msg;
}

function esconderErro() {

    exceptionBox.classList.add("hidden");
}


// ===========================
// TELA 1 -> TELA 2
// ===========================

document
.getElementById("btnSincronizar")
.addEventListener("click", async () => {

    try {

        esconderErro();

        const payload = {

            servidor:
                document.getElementById("servidor").value,

            clientes: [

                document.getElementById("cliente1").value,

                document.getElementById("cliente2").value,

                document.getElementById("cliente3").value
            ]
        };

        const response = await fetch(
            "/sincronizar",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        dadosSync = data;

        renderTela2(data);

    } catch (error) {

        mostrarErro(error.message);
    }
});


// ===========================
// TELA 2
// ===========================

function renderTela2(data) {

    resultado.innerHTML = `

        <div
            class="info-box"
            id="box-sincronizacao"
        >

            <h3>
                Dados de sincronização
            </h3>

            <p>
                Clock lógico:
                ${data.media}
            </p>

            <p>
                Ajuste do Servidor:
                ${data.ajuste_servidor} min
            </p>

            ${data.eventos.map(evento => `

                <p>
                    Ajuste do Clock
                    (cliente ${evento.cliente}):

                    ${evento.ajuste_min} min
                </p>

            `).join("")}

        </div>

        <div
            id="processos-container"
            class="hidden"
        >

        </div>

    `;

    tituloEsquerda.innerText =
        "Dados de Envio";

    inputsHorarios.classList.add("hidden");

    inputsEnvio.classList.remove("hidden");
}


// ===========================
// TELA 3 -> TELA 4
// ===========================

document
.getElementById("btnEnviar")
.addEventListener("click", () => {

    try {

        esconderErro();

        const envios = [

            {
                cliente: 1,
                envio:
                    document.getElementById("envio1").value
            },

            {
                cliente: 2,
                envio:
                    document.getElementById("envio2").value
            },

            {
                cliente: 3,
                envio:
                    document.getElementById("envio3").value
            }
        ];

        const resultadoFinal = envios.map(envio => {

            const clienteData =
                dadosSync.eventos.find(
                    e => e.cliente === envio.cliente
                );

            const envioMin =
                horaParaMinutos(envio.envio);

            const ajuste =
                clienteData.ajuste_min;

            const horarioLogico =
                minutosParaHora(
                    envioMin + ajuste
                );

            return {

                cliente: envio.cliente,

                envio_original:
                    envio.envio,

                horario_logico:
                    horarioLogico
            };
        });

        resultadoFinal.sort((a, b) => {

            return horaParaMinutos(
                a.horario_logico
            ) -

            horaParaMinutos(
                b.horario_logico
            );
        });

        renderTela4(resultadoFinal);

    } catch (error) {

        mostrarErro(error.message);
    }
});


// ===========================
// TELA 4
// ===========================

function renderTela4(dados) {

    const container =
        document.getElementById(
            "processos-container"
        );

    container.classList.remove("hidden");

    container.innerHTML = `

        <div class="info-box">

            <h3>
                Processos Ordenados
            </h3>

            ${dados.map((dado, index) => `

                <div
                    style="
                        margin-top: 20px;
                        padding-top: 15px;
                        border-top: 1px solid #ccc;
                    "
                >

                    <p>
                        <strong>
                            ${index + 1}º Processo
                        </strong>
                    </p>

                    <p>
                        Cliente:
                        ${dado.cliente}
                    </p>

                    <p>
                        Hora envio:
                        ${dado.envio_original}
                    </p>

                    <p>
                        Horário lógico:
                        ${dado.horario_logico}
                    </p>

                </div>

            `).join("")}

        </div>
    `;
}