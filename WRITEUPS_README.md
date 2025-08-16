# Seção de Writeups - Guia de Personalização

## 📝 Visão Geral

A seção de writeups foi criada para exibir seus CTF writeups de forma organizada e profissional. Ela inclui:

- **Filtros por categoria** (Pwn, Web, Crypto, Forensics, Reverse, Misc)
- **Cards informativos** com detalhes de cada writeup
- **Modal de detalhes** para informações completas
- **Links diretos** para GitHub e arquivos específicos
- **Sistema de tags** para organização
- **Design responsivo** com tema vermelho escuro

## 🎯 Como Personalizar

### 1. **Adicionar Novos Writeups**

Edite o array `writeups` no arquivo `components/writeups-section.tsx`:

```typescript
const writeups: Writeup[] = [
  {
    id: "seu-writeup-id",
    title: "Título do Writeup",
    description: "Descrição detalhada do desafio",
    category: "Pwn", // Pwn, Web, Crypto, Forensics, Reverse, Misc
    difficulty: "Easy", // Easy, Medium, Hard
    platform: "CTFTime", // CTFTime, HackTheBox, TryHackMe, etc.
    date: "2024-01-01", // Formato YYYY-MM-DD
    tags: ["tag1", "tag2", "tag3"],
    githubUrl: "https://github.com/seu-usuario/repo/tree/main/writeup",
    readmeUrl: "https://github.com/seu-usuario/repo/blob/main/writeup/README.md", // Opcional
    solved: true, // true/false
    points: 100, // Pontos do CTF (opcional)
    rating: 4.5 // Sua avaliação 1-5 (opcional)
  }
]
```

### 2. **Modificar Categorias**

Edite o array `categories` para adicionar/remover categorias:

```typescript
const categories = [
  { id: "all", name: "All Writeups", count: writeups.length },
  { id: "pwn", name: "Pwn", count: writeups.filter(w => w.category === "Pwn").length },
  { id: "web", name: "Web", count: writeups.filter(w => w.category === "Web").length },
  // Adicione novas categorias aqui
]
```

### 3. **Personalizar Cores das Categorias**

Modifique a função `getCategoryColor` para alterar as cores:

```typescript
const getCategoryColor = (category: string) => {
  const colors = {
    'Pwn': 'bg-red-500/10 text-red-400 border-red-500/30',
    'Web': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Crypto': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Forensics': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Reverse': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    'Misc': 'bg-gray-500/10 text-gray-400 border-gray-500/30'
  }
  return colors[category as keyof typeof colors] || colors['Misc']
}
```

### 4. **Alterar Links do GitHub**

Modifique os URLs no final da seção:

```typescript
// Link principal do repositório
onClick={() => window.open("https://github.com/SEU-USUARIO/ctf-writeups", "_blank")}

// Link do README
onClick={() => window.open("https://github.com/SEU-USUARIO/ctf-writeups/blob/main/README.md", "_blank")}
```

## 🏗️ Estrutura do Repositório GitHub

Para melhor organização, recomendo estruturar seu repositório assim:

```
ctf-writeups/
├── README.md
├── pwn/
│   ├── pwn-101/
│   │   ├── README.md
│   │   ├── exploit.py
│   │   └── solution.md
│   └── outro-pwn/
├── web/
│   ├── web-xss/
│   └── outro-web/
├── crypto/
├── forensics/
├── reverse/
└── misc/
```

## 📱 Responsividade

A seção é totalmente responsiva:
- **Mobile**: 1 coluna
- **Tablet**: 2 colunas  
- **Desktop**: 3 colunas

## 🎨 Tema de Cores

A seção usa o tema vermelho escuro consistente com o resto do portfolio:
- **Primário**: `red-600`
- **Hover**: `red-700`
- **Bordas**: `red-600/20` a `red-600/50`
- **Backgrounds**: `gray-900`

## 🚀 Funcionalidades

- **Filtros dinâmicos** por categoria
- **Modal de detalhes** com informações completas
- **Links diretos** para GitHub
- **Sistema de tags** organizado
- **Animações** com Framer Motion
- **Contadores** de writeups por categoria

## 🔧 Troubleshooting

### Erro de Build
Se houver erro de build, verifique:
1. Todos os imports estão corretos
2. Componentes UI existem em `components/ui/`
3. Dependências estão instaladas

### Componente não aparece
Verifique se:
1. A seção foi adicionada ao `app/page.tsx`
2. O ID da seção está correto (`#writeups`)
3. A navbar está linkando corretamente

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Console do navegador para erros
2. Terminal para erros de build
3. Estrutura de arquivos e imports 