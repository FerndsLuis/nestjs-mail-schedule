import { Button, Nav } from 'components';

export function WriteNowPage() {
  return (
    <>
      <Nav />
      <div className="container">
        <h1>Escrever Agora</h1>

        <form className="form">
          <label htmlFor="destinationName">Nome completo</label>
          <input type="text" />
          <label htmlFor="destinationAddress">E-mail</label>
          <input type="text" />
          <label htmlFor="dueDate">Data</label>
          <input type="text" />
          <label htmlFor="subject">Assunto</label>
          <input type="text" />
          <label htmlFor="body">Mensagem</label>
          <input type="text" />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </>
  );
}
