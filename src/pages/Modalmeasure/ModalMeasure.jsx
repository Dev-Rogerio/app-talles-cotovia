import React, { useState, useEffect } from "react";
import LogoCotovia from "../AssetsIcon/cotovia.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./ModalMeasure.css";

// const API_URL = process.env.REACT_APP_API_URL || "https://seu-backend-no-render.onrender.com";
// const API_URL =  process.env.REACT_APP_API_URL || "https://seu-backend-no-render.onrender.com";
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ModalMeasure = ({
  openMeasure,
  setOpenMeasure,
  rows,
  setRows,
  cpf,
  client,
  colar,
  pala,
  manga,
  cintura,
  quadril,
  cumprimento,
  biceps,
  antebraco,
  punhoEsquerdo,
  punhoDireito,
  torax,
  extraRigido,
  barbatana,
  modelColar,
  vendedor,
  id,
  inputDate,
  deliveryDate,
  metersTissue,
  monograma,
  modelFish,
  typeFront,
  typeModel,
  typePense,
  description = "", // Valor inicial da descrição
}) => {
  const [localDescription, setLocalDescription] = useState(description); // Inicializa com a descrição passada
  const navigate = useNavigate();

  // Carregar a descrição apenas da prop 'description' (sem uso do localStorage)
  useEffect(() => {
    if (!openMeasure) return;

    setLocalDescription(description || ""); // Garantir que, caso não tenha descrição, use uma string vazia
  }, [openMeasure, description]);

  // Função para enviar o e-mail com os dados do pedido
  // const handleSendEmail = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/send-pedido", {
  //       cpf,
  //       client,
  //       colar,
  //       pala,
  //       manga,
  //       cintura,
  //       quadril,
  //       cumprimento,
  //       biceps,
  //       antebraco,
  //       punhoEsquerdo,
  //       punhoDireito,
  //       torax,
  //       extraRigido,
  //       barbatana,
  //       modelColar,
  //       vendedor,
  //       id,
  //       inputDate,
  //       deliveryDate,
  //       metersTissue,
  //       monograma,
  //       modelFish,
  //       typeFront,
  //       typeModel,
  //       typePense,
  //       description: localDescription,
  //       rows,
  //     });
  //     alert(response.data.message); // Exibir a mensagem de sucesso
  //   } catch (error) {
  //     console.error("Erro ao enviar o e-mail:", error);
  //     alert("Erro ao enviar o e-mail.");
  //   }
  // };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/send-pedido`, {
        cpf,
        client,
        colar,
        pala,
        manga,
        cintura,
        quadril,
        cumprimento,
        biceps,
        antebraco,
        punhoEsquerdo,
        punhoDireito,
        torax,
        extraRigido,
        barbatana,
        modelColar,
        vendedor,
        id,
        inputDate,
        deliveryDate,
        metersTissue,
        monograma,
        modelFish,
        typeFront,
        typeModel,
        typePense,
        description: localDescription,
        rows,
      });
      alert(response.data.message); // Exibir a mensagem de sucesso
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
      alert("Erro ao enviar o e-mail.");
    }
  };

  //   -----------------------------------------------------------------------------------------------------------------------

  // Função para imprimir o conteúdo do modal
  const handlePrint = () => {
    const originalBody = document.body.innerHTML;
    try {
      const modalContent = document.querySelector(".modal").innerHTML;
      document.body.innerHTML = modalContent;
      window.print();
    } finally {
      document.body.innerHTML = originalBody;
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setRows(rows);
    setOpenMeasure(false);
    navigate("/"); // Navega para a página de measure
  };

  // Atualiza o valor de 'localDescription' quando o usuário digita no textarea
  const handleDescriptionChange = (e) => {
    const updatedDescription = e.target.value;
    setLocalDescription(updatedDescription);
  };

  if (!openMeasure) return null;

  return (
    <div className="modal">
      <div>
        {/* Header */}
        <section className="_navModalMeasure">
          <img src={LogoCotovia} alt="Logo Cotovia" />
        </section>

        {/* Título */}
        <section className="text-titlle">
          <h1>Ficha Técnica do Pedido</h1>
        </section>

        {/* Informações do Cliente e Pedido */}
        <div className="sectorClientSuplier">
          <section className="_sectionClient">
            <p>
              CPF: <strong>{cpf}</strong>
            </p>
            <p>
              Cliente: <strong>{client}</strong>
            </p>
            <p>
              Contato: <strong>{""}</strong>
            </p>
          </section>
          <section className="_sectionDateInfo">
            <p>
              N. do Pedido: <strong>{id}</strong>
            </p>
            <p className="vendedor">
              Vendedor: <strong>{vendedor}</strong>
            </p>
            <p>
              Data do Pedido: <strong>{inputDate}</strong>
            </p>
            <p>
              Data de Entrega: <strong>{deliveryDate}</strong>
            </p>
          </section>
        </div>

        {/* Medidas Personalizadas */}
        <div className="sectorPersonalized">
          <section className="_firstLeft-MeasureDate">
            <p>
              Colar: <strong>{colar}</strong>
            </p>
            <p>
              Pala: <strong>{pala}</strong>
            </p>
            <p>
              Manga: <strong>{manga}</strong>
            </p>
            <p>
              Tórax: <strong>{torax}</strong>
            </p>
            <p>
              Cintura: <strong>{cintura}</strong>
            </p>
            <p>
              Quadril: <strong>{quadril}</strong>
            </p>
            <p>
              Cumprimento: <strong>{cumprimento}</strong>
            </p>
            <p>
              Biceps: <strong>{biceps}</strong>
            </p>
            <p>
              Antebraço: <strong>{antebraco}</strong>
            </p>
            <p>
              Punho E: <strong>{punhoEsquerdo}</strong>
            </p>
            <p>
              Punho D: <strong>{punhoDireito}</strong>
            </p>
          </section>
          <section className="_secondRight-MeasureDate">
            <p>
              Calarinho: <strong>{modelColar}</strong>
            </p>
            <p>
              Punhos: <strong>{modelFish}</strong>
            </p>
            <p>
              Frente: <strong>{typeFront}</strong>
            </p>
            <p>
              Monograma: <strong>{monograma}</strong>
            </p>
            <p>
              Rígido: <strong>{extraRigido}</strong>
            </p>
            <p>
              Barbatana: <strong>{barbatana}</strong>
            </p>
            <p>
              Pense: <strong>{typePense}</strong>
            </p>
            <p>
              Modelo: <strong>{typeModel}</strong>
            </p>
            <p>
              Mtrs. de tecido: <strong>{metersTissue}</strong>
            </p>
          </section>
        </div>

        {/* Área para descrição */}
        <div className="_wrapperModArea">
          <textarea
            name="Importante"
            id="important"
            value={localDescription}
            onChange={handleDescriptionChange} // Atualiza a descrição com o valor digitado
          />
        </div>

        {/* Botões */}
        <div className="sectorBotton">
          <section className="_wrapper-divFooter">
            <div className="areaButton">
              <button onClick={handleSendEmail}>Enviar E-mail</button>
              <button onClick={handlePrint}>Imprimir</button>
              <button onClick={handleCloseModal}>Corrigir</button>
            </div>
          </section>
        </div>

        <table border="1">
          <thead>
            <tr>
              <th>Cód. Produto</th>
              <th>Cód. Tecido</th>
              <th>Textura</th>
              <th>Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.codTextil}</td>
                <td>{row.codProduct}</td>
                <td>{row.texture}</td>
                <td>{row.fornecedor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalMeasure;
