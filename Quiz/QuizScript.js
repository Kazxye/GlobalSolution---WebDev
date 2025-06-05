const quizData = [
    {
        question: "Qual tecnologia é usada para mapear o fundo aquático?",
        answers: ["Sensores Acústicos", "Sonar Avançado", "GPS", "Câmeras Subaquáticas"],
        correct: 1
    },
    {
        question: "O que aumenta as chances de sobrevivência em resgates aquáticos?",
        answers: ["Redução do tempo de localização", "Mais mergulhadores", "Uso de luzes", "Sorte"],
        correct: 0
    },
    {
        question: "Qual organização NÃO faz parte do público-alvo?",
        answers: ["Corpo de Bombeiros", "Defesa Civil", "Guarda Costeira", "Escolas de Natação"],
        correct: 3
    },
    {
        question: "Sensores acústicos servem para:",
        answers: ["Fotografar o fundo", "Emitir alertas sonoros", "Detectar sinais vitais", "Limpar a água"],
        correct: 2
    },
    {
        question: "O que dificulta as operações de busca aquática?",
        answers: ["Céu limpo", "Água cristalina", "Correntes e visibilidade limitada", "Sol forte"],
        correct: 2
    },
    {
        question: "O que representa o maior ganho da solução AquaRescue?",
        answers: ["Velocidade e Precisão", "Custo mais alto", "Mais trabalho manual", "Menos tecnologia"],
        correct: 0
    },
    {
        question: "A quem é destinado o sistema AquaRescue?",
        answers: ["Bombeiros, Guarda Costeira e Defesa Civil", "Clubes de Pesca", "Turistas", "Mergulhadores recreativos"],
        correct: 0
    },
    {
        question: "O que significa IA no contexto do projeto?",
        answers: ["Inteligência Artificial", "Informação Aquática", "Intervenção Autônoma", "Iluminação Avançada"],
        correct: 0
    },
    {
        question: "A operação segura é garantida por:",
        answers: ["Papelada eficiente", "Monitoramento remoto e automação", "Treinamento manual", "Máscaras melhores"],
        correct: 1
    },
    {
        question: "Qual o benefício final do AquaRescue?",
        answers: ["Salvar vidas e reduzir riscos", "Aumentar burocracia", "Dificultar operações", "Apenas monitoramento visual"],
        correct: 0
    }
];

const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-button');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');
const resultText = document.getElementById('result-text');
const resultMessage = document.getElementById('result-message');