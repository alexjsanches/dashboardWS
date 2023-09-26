SELECT
    CAB.CODEMP AS "Empresa",
    CAB.NUNOTA AS "Nro. Unico",
    CAB.NUMNOTA AS "Nro. Nota",
    TO_DATE (CAB.DTNEG, 'DD/MM/YY') AS "Dt. Negociação",
    TO_DATE (CAB.DTENTSAI, 'DD/MM/YY') AS "Dt. Ent/Sai",
    CGM.DTREF AS "Dt. Ref",
    UPPER(TIM_MONTHEXT(CAB.DTENTSAI)) AS "Mês",
    PAN_ANO(CAB.DTENTSAI) AS "Ano",
    CAB.CODPARC AS "Cód. Parceiro",
    PAR.RAZAOSOCIAL AS "Razão Social",
    CID.NOMECID AS "Cidade",
    UF.UF AS "UF",
    UF.DESCRICAO AS "Estado",
    'BRASIL' AS "País",
    CAB.TIPMOV AS "Tipo Movimento",
    CASE
        WHEN CAB.TIPMOV = 'V' THEN 'VENDA'
        WHEN CAB.TIPMOV = 'D' THEN 'DEVOLUÇÃO'
        ELSE 'VERIFICAR COM O MARCELO'
    END AS "Descrição Movimento",
    CASE
        WHEN GER.CODVEND = 0
        AND CAB.CODEMP = 1 THEN 'UBERLANDIA'
        WHEN GER.CODVEND = 0
        AND CAB.CODEMP = 2 THEN 'CATALAO'
        WHEN GER.CODVEND = 0
        AND CAB.CODEMP = 3 THEN 'GOIANIA'
        ELSE GER.APELIDO
    END AS "Gerente",
    CAB.CODVEND AS "Cód. Vendedor",
    VEN.APELIDO AS "Vendedor",
    ITE.CODPROD AS "Cód. Produto",
    PRO.DESCRPROD AS "Descrição",
    ITE.CONTROLE AS "Controle",
    PRO.MARCA AS "Marca",
    ITE.QTDNEG AS "Qtd. Negociada",
    ROUND (ITE.VLRUNIT, 2) AS "Vlr. Unitário",
    ROUND (SUM (ITE.VLRTOT * TOP.GOLDEV), 2) AS "Vlr. Total Item",
    SUM (CAB.VLRNOTA * TOP.GOLDEV) AS "Vlr. Nota"
FROM
    TGFCAB CAB,
    VGFCAB VCA,
    TGFEMP EMP,
    TGFCGM CGM,
    TGFPAR PAR,
    TSICID CID,
    TSIUFS UF,
    TGFTOP TOP,
    TGFITE ITE
    LEFT JOIN (
        SELECT
            DIN.NUNOTA,
            DIN.SEQUENCIA,
            SUM (
                CASE
                    WHEN DIN.CODIMP = 6 THEN 1
                    ELSE 0
                END
            ) AS PIS,
            SUM (
                CASE
                    WHEN DIN.CODIMP = 7 THEN 1
                    ELSE 0
                END
            ) AS COFINS,
            SUM (
                CASE
                    WHEN DIN.CODIMP = 9 THEN 1
                    ELSE 0
                END
            ) AS CSL,
            SUM (
                CASE
                    WHEN DIN.CODIMP = 10 THEN 1
                    ELSE 0
                END
            ) AS IRPJ,
            SUM (
                CASE
                    WHEN DIN.CODIMP = 11 THEN 1
                    ELSE 0
                END
            ) AS CPP,
            SUM (
                CASE
                    WHEN DIN.CODIMP IN (
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11
                    ) THEN DIN.VALOR
                    ELSE 0
                END
            ) AS TOTIMP
        FROM
            TGFDIN DIN
            INNER JOIN TGFCAB C ON (C.NUNOTA = DIN.NUNOTA)
        WHERE
            TRUNC (C.DTENTSAI) >= '01/01/2000'
            AND TRUNC (C.DTENTSAI) <= '31/12/2100'
            AND DIN.CODIMP IN (
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11
            )
        GROUP BY
            DIN.NUNOTA,
            DIN.SEQUENCIA
    ) TDIN ON (
        TDIN.NUNOTA = ITE.NUNOTA
        AND TDIN.SEQUENCIA = ITE.SEQUENCIA
    ),
    TGFPRO PRO,
    TGFVEN VEN,
    TGFVEN GER
WHERE
    CAB.NUNOTA = ITE.NUNOTA
    AND CAB.DTFATUR IS NULL
    AND CAB.CODPARC = PAR.CODPARC
    AND CAB.NUNOTA = VCA.NUNOTA
    AND CAB.CODEMP = EMP.CODEMP
    AND CAB.CODTIPOPER IN (34, 159, 234) -- Alteração: Filtrar por códigos 34, 159 e 234
    AND CAB.DTNEG BETWEEN TO_DATE('01/09/2023', 'DD/MM/YYYY') AND TO_DATE('03/09/2023', 'DD/MM/YYYY') -- Alteração: Filtro pela data de negociação DTNEG
    AND CAB.DHTIPOPER = TOP.DHALTER
    AND ITE.CODPROD = PRO.CODPROD
    AND PAR.CODCID = CID.CODCID
    AND CID.UF = UF.CODUF
    AND CAB.CODVEND = VEN.CODVEND
    AND TOP.GOLSINAL = -1
    AND VEN.CODGER = GER.CODVEND
    AND CAB.CODEMP IN (1, 2, 3)
    AND CGM.CODEMP = EMP.CODEMP
    AND CGM.DTREF = (
        SELECT
            MAX (C.DTREF)
        FROM
            TGFCGM C
        WHERE
            C.CODEMP = EMP.CODEMP
            AND C.DTREF <= CAB.DTNEG
    )
    AND (
        (
            GOLSINAL = -1
            AND TOP.GOLDEV = -1
            AND CAB.TIPMOV IN ('D') -- Alteração: Filtro pelo tipo de movimento 'D'
            AND CAB.STATUSNOTA = 'L'
        )
        OR (
            GOLSINAL = -1
            AND TOP.GOLDEV = 1
            AND CAB.TIPMOV IN ('V', 'D') -- Alteração: Filtro pelos tipos de movimento 'V' e 'D'
            AND CAB.STATUSNOTA = 'L'
        )
        OR (
            GOLSINAL = 1
            AND TOP.GOLDEV = 1
        )
        OR (
            GOLSINAL = 1
            AND TOP.GOLDEV = -1
        )
    )

GROUP BY
    CAB.CODEMP,
    CAB.NUNOTA,
    CAB.NUMNOTA,
    CAB.DTNEG,
    CAB.DTENTSAI,
    CGM.DTREF,
    CAB.CODPARC,
    PAR.RAZAOSOCIAL,
    CID.NOMECID,
    UF.UF,
    UF.DESCRICAO,
    CAB.TIPMOV,
    GER.CODVEND,
    GER.APELIDO,
    CAB.CODVEND,
    VEN.APELIDO,
    ITE.CODPROD,
    PRO.DESCRPROD,
    ITE.CONTROLE,
    ITE.QTDNEG,
    CAB.VLRNOTA,
    TOP.GOLDEV,
    PRO.MARCA,
    ITE.VLRUNIT,
    ITE.VLRTOT
ORDER BY
    CAB.DTENTSAI