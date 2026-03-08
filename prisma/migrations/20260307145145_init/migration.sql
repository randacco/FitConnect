-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Treino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personalNome" TEXT NOT NULL,
    "personalRating" REAL NOT NULL DEFAULT 4.5,
    "academiaNome" TEXT NOT NULL,
    "academiaEndereco" TEXT NOT NULL,
    "academiaRating" REAL NOT NULL DEFAULT 4.5,
    "dataHora" DATETIME NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL DEFAULT 60,
    "valorTotal" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "treinoId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'confirmada',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reserva_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reserva_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Treino_status_idx" ON "Treino"("status");

-- CreateIndex
CREATE INDEX "Treino_dataHora_idx" ON "Treino"("dataHora");

-- CreateIndex
CREATE INDEX "Reserva_alunoId_idx" ON "Reserva"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_treinoId_key" ON "Reserva"("treinoId");
