from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


# Utils
def hora_para_float(hora_str):
    h, m = map(int, hora_str.split(":"))
    return h + m / 60


def float_para_hora(valor):
    total_minutos = int(round(valor * 60))

    h = (total_minutos // 60) % 24
    m = total_minutos % 60

    return f"{h:02d}:{m:02d}"


def diferenca_minutos(target, original):
    return round((target - original) * 60)


# Rotas
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/sincronizar", methods=["POST"])
def sincronizar():

    try:
        dados = request.json

        hora_servidor = hora_para_float(dados["servidor"])
        horas_clientes = [hora_para_float(hora) for hora in dados["clientes"]]

        quantidade_total = len(horas_clientes) + 1

        media = (hora_servidor + sum(horas_clientes)) / quantidade_total

        eventos = []

        for index, hora_cliente in enumerate(horas_clientes):

            ajuste = diferenca_minutos(media, hora_cliente)

            horario_logico = float_para_hora(media)

            eventos.append(
                {
                    "cliente": index + 1,
                    "hora_original": float_para_hora(hora_cliente),
                    "ajuste_min": ajuste,
                    "horario_logico": horario_logico,
                }
            )

        ajuste_servidor = diferenca_minutos(media, hora_servidor)

        eventos_ordenados = sorted(eventos, key=lambda evento: evento["hora_original"])

        return jsonify(
            {
                "success": True,
                "hora_servidor": float_para_hora(hora_servidor),
                "media": float_para_hora(media),
                "ajuste_servidor": ajuste_servidor,
                "eventos": eventos,
                "ordenacao": eventos_ordenados,
            }
        )

    except Exception as error:

        return jsonify({"success": False, "message": str(error)}), 400


if __name__ == "__main__":
    app.run(port=3000)
