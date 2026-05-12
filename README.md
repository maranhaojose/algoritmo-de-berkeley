# Sincronização de Clocks com Algoritmo de Berkeley


 **Componentes**
 ``` 
 Denis Do Nascimmento Rodrigues
 José Maranhão Da silva Neto
 ```


Projeto acadêmico desenvolvido para simular a sincronização de relógios em sistemas distribuídos utilizando a lógica do **Algoritmo de Berkeley**.



A aplicação permite:

- Informar horários locais de um servidor e três clientes;

- Sincronizar os Cloks utilizando o algoritmo de Berkeley;

- Exibir os dados de sincronização dos Cloks;

- Ordenar os processos com base no horário de envio.

---

# Tecnologias Utilizadas

- Python
- Flask
- HTML
- CSS
- JavaScript


---



# Como Executar o Projeto



Certifique-se de estar na pasta raiz do projeto (`algoritmo-de-berkeley`) antes de iniciar os passos abaixo.



## 1. Criar o ambiente virtual

```bash
python3 -m venv .venv
```




Escolha o comando de acordo com o seu sistema operacional:

  **Linux ou macOS:**
  ```bash
source .venv/bin/activate
  ```
  **Windows (Prompt de Comando):**
  ```cmd
.venv\Scripts\activate
  ```
  **Windows (PowerShell):**
  ```powershell
.\.venv\Scripts\Activate.ps1
  ```

### 3. Instalar Dependências
Com o ambiente ativo, instale os pacotes necessários:
```bash
pip install -r requirements.txt
```

### 4. Iniciar a Aplicação
Execute o servidor Flask:
```bash
python3 agl.py
```

### 5. Acessar o Sistema
Após o início do serviço, abra o navegador e acesse:
[http://127.0.0.1:3000](http://127.0.0.1:3000)

---

