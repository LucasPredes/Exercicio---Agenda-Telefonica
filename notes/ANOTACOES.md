# Anotações - Responsividade

## 1. Container (main.css, linhas 36-46)

**ANTES:**
```css
.container {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
}

.container .logo {
    color: var(--bg);
    margin-bottom: 40px;
    transform: translate(50px, 50px);
}
```

**DEPOIS:**
```css
.container {
    margin: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.container .logo {
    color: var(--bg);
    margin-bottom: 30px;
    font-size: 28px;
}
```

**POR QUE:**
- `margin: 40px 20px` em vez de `margin-top: 100px`: evita que o conteúdo seja cortado em telas menores
- `align-items: center`: centraliza o container
- `width: 100%`: permite que o container ocupe toda a largura disponível
- `transform` removido e `font-size` adicionado: o transform causava deslocamento imprevisível em mobile

---

## 2. Body (main.css, linha 33)

**ANTES:**
```css
body {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-image: linear-gradient(135deg, var(--danger), var(--secondary)60%);
}
```

**DEPOIS:**
```css
body {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-image: linear-gradient(135deg, var(--danger), var(--secondary)60%);
    padding: 20px;
}
```

**POR QUE:**
- `padding: 20px`: evita que o conteúdo encoste nas bordas da tela em dispositivos menores

---

## 3. Formulário #form-planner (main.css, linhas 48-83)

**ANTES:**
```css
#form-planner {
    display: flex;
    background-color:#00BCD4;
    height: 150px;
    min-width: 100vh;
    justify-content: space-around;
    align-items: center;
}
```

**DEPOIS:**
```css
#form-planner {
    display: flex;
    background-color:#00BCD4;
    padding: 20px;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    border-radius: 10px;
    width: 100%;
    max-width: 800px;
}
```

**POR QUE:**
- `flex-wrap: wrap`: permite que os campos do formulário quebrem para próxima linha quando não cabem na mesma
- `gap: 15px`: adiciona espaçamento entre os campos quando eles quebram linha
- `max-width: 800px`: limita a largura máxima para não esticar demais em telas grandes
- `height: 150px` removido: altura fixa causava problemas de layout
- `padding: 20px` adicionado: espaçamento interno adequado
- `border-radius: 10px`: melhora a aparência visual

---

## 4. Inputs do Formulário (main.css, novo)

**ADICIONADO:**
```css
#form-planner input {
    flex: 1 1 200px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
}
```

**POR QUE:**
- `flex: 1 1 200px`: cada input ocupa no mínimo 200px, mas cresce para preencher o espaço disponível
- `padding: 12px`: espaçamento interno para facilitar digitação
- `border: none`: remove borda padrão feia
- `border-radius: 8px`: visual mais amigável

---

## 5. Botão do Formulário (main.css, novo)

**ADICIONADO:**
```css
#form-planner button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    background-color: var(--secondary);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

#form-planner button:hover {
    background-color: var(--azul-escuro);
}
```

**POR QUE:**
- `transition: background 0.3s`: efeito suave ao passar o mouse
- Estilos de botões eram aplicados inline no HTML, agora estão no CSS

---

## 6. Estilos da Tabela (main.css, novo - linhas 85-115)

**ADICIONADO:**
```css
#tabela-cadastro {
    width: 100%;
    max-width: 800px;
    margin-top: 30px;
    border-collapse: collapse;
    background-color: var(--surface);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
```

**POR QUE:**
- Tabelas sem estilo explícito ficam quebradas e difíceis de ler em mobile
- `border-collapse: collapse`: remove espaços entre células
- `overflow: hidden` + `border-radius`: aplica o arredondamento corretamente na tabela

---

## 7. Media Query (main.css, linhas 117-131)

**ADICIONADO:**
```css
@media (max-width: 600px) {
    #tabela-cadastro {
        font-size: 14px;
    }
    
    #tabela-cadastro th,
    #tabela-cadastro td {
        padding: 10px 8px;
    }
    
    .container .logo {
        font-size: 22px;
    }
    
    #form-planner input {
        width: 100%;
    }
}
```

**POR QUE:**
- Media query aplica estilos específicos para telas menores que 600px
- Reduz padding, fonte e tamanhos para que tudo caiba
- `max-width: 600px` é o breakpoint padrão para mobile

---

## Resumo das Técnicas de Responsividade Usadas

| Técnica | Onde Usou |
|---------|-----------|
| `flex-wrap: wrap` | Formulário |
| `max-width` | Container, Formulário, Tabela |
| `gap` | Formulário |
| `flex: 1 1 200px` | Inputs |
| `padding` | Body, Formulário, Tabela |
| `media query` | Ajustes em telas < 600px |
