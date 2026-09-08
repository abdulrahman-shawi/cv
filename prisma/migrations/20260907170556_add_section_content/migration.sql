-- CreateTable
CREATE TABLE "SectionContent" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionContent_section_lang_key" ON "SectionContent"("section", "lang");
