SELECT
    CAB.CODEMP,
    CAB.NUNOTA,
    CAB.NUMNOTA,
    CAB.ORDEMCARGA,
    CAB.DTNEG,
    CAB.DTPREVENT,
    CAB.CODTIPOPER,
    TOP.DESCROPER,
    CAB.TIPMOV,
    CAB.CODTIPVENDA,
    TPV.DESCRTIPVENDA,
    (
        SELECT
            OPC.OPCAO
        FROM
            TDDCAM CAM
            JOIN TDDOPC OPC ON (OPC.NUCAMPO = CAM.NUCAMPO)
        WHERE
            (
                CAM.NOMETAB = 'TGFCAB'
                AND NOMECAMPO = 'AD_ENTREGACLIENTE'
                AND OPC.VALOR = CAB.AD_ENTREGACLIENTE
            )
    ) AS ENTREGACLIENTE,
    PAR.AD_CODPROJ,
    PRJ.IDENTIFICACAO,
    CAB.CODVEND,
    VEN.APELIDO,
    (
        SELECT
            CID.NOMECID
        FROM
            TSICID CID
        WHERE
            CID.CODCID = PAR.CODCID
    ) AS CIDADE,
    (
        SELECT
            UFS.UF
        FROM
            TSICID CID
            LEFT JOIN TSIUFS UFS ON CID.UF = UFS.CODUF
        WHERE
            CID.CODCID = PAR.CODCID
    ) AS UF,
    CAB.CODPARC,
    PAR.RAZAOSOCIAL,
    TPP.DESCRTIPPARC,
    (
        SELECT
            OPC.OPCAO
        FROM
            TDDCAM CAM
            JOIN TDDOPC OPC ON (OPC.NUCAMPO = CAM.NUCAMPO)
        WHERE
            (
                CAM.NOMETAB = 'TGFCAB'
                AND NOMECAMPO = 'AD_STATUSAGUARD'
                AND OPC.VALOR = CAB.AD_STATUSAGUARD
            )
    ) AS "STATUS AGUARDANDO",
    ITE.SEQUENCIA,
    ITE.PENDENTE,
    ITE.CODPROD,
    PRO.DESCRPROD,
    PRO.MARCA,
    ITE.CONTROLE,
    ITE.QTDNEG,
    ITE.VLRUNIT,
    CASE
        WHEN CAB.TIPMOV = 'D' THEN (ITE.VLRTOT * -1)
        ELSE ITE.VLRTOT
    END AS VLRTOT,
    ITE.VLRICMS,
    ITE.ALIQICMS,
    ITE.CODCFO,
    ITE.CODTRIB,
    NVL(
        (
            SELECT
                SUM(EST.ESTOQUE)
            FROM
                TGFEST EST
            WHERE
                EST.CODEMP = CAB.CODEMP
                AND EST.CODPROD = ITE.CODPROD
                AND EST.CONTROLE = ITE.CONTROLE
                AND EST.CODLOCAL NOT IN (6010, 7010, 8010, 9010)
        ),
        0
    ) AS ESTOQUE,
    UPPER(TIM_MONTHEXT(CAB.DTENTSAI)) AS "MÊS",
    PAN_ANO(CAB.DTENTSAI) AS ANO,
    ITE.CODLOCALORIG,
    NVL(
        (
            SELECT
                SUM(ESTOQUE)
            FROM
                TGFEST EST
            WHERE
                EST.CODEMP = CAB.CODEMP
                AND EST.CODPROD = ITE.CODPROD
                AND EST.CODLOCAL = ITE.CODLOCALORIG
        ),
        0
    ) AS ESTOQUE_LOCAL,
    CASE
        WHEN CAB.CODTIPOPER IN (35, 235) THEN (
            SELECT
                OPC.OPCAO
            FROM
                TDDCAM CAM
                JOIN TDDOPC OPC ON (OPC.NUCAMPO = CAM.NUCAMPO)
            WHERE
                (
                    CAM.NOMETAB = 'TGFCAB'
                    AND NOMECAMPO = 'CIF_FOB'
                )
                AND OPC.VALOR = CAB.CIF_FOB
        )
        ELSE NULL
    END CIF_FOB,
    (
        CASE
            WHEN CAB.CODTIPOPER IN (35, 235) THEN (
                SELECT
                    C.CODPARCTRANSP
                FROM
                    TGFCAB C,
                    TGFPAR P
                WHERE
                    P.CODPARC = C.CODPARC
                    AND CAB.NUNOTA = C.NUNOTA
            )
            ELSE NULL
        END
    ) || ' - ' || (
        CASE
            WHEN CAB.CODTIPOPER IN (35, 235) THEN (
                SELECT
                    P.RAZAOSOCIAL
                FROM
                    TGFCAB C,
                    TGFPAR P
                WHERE
                    P.CODPARC = C.CODPARCTRANSP
                    AND CAB.NUNOTA = C.NUNOTA
            )
            ELSE NULL
        END
    ) TRANSPORTADORA
FROM
    TGFCAB CAB,
    TGFPAR PAR
    LEFT JOIN TGFTPP TPP ON TPP.CODTIPPARC = PAR.CODTIPPARC,
    TGFVEN VEN,
    TGFITE ITE,
    TGFPRO PRO,
    TGFTOP TOP,
    TGFTPV TPV,
    TCSPRJ PRJ
WHERE
    CAB.CODPARC = PAR.CODPARC
    AND CAB.CODVEND = VEN.CODVEND
    AND CAB.NUNOTA = ITE.NUNOTA
    AND ITE.CODPROD = PRO.CODPROD
    AND PAR.AD_CODPROJ = PRJ.CODPROJ
    AND CAB.CODTIPOPER IN (35, 36, 164, 146, 48, 153, 235, 7, 21, 36, 78)
    AND CAB.CODTIPOPER = TOP.CODTIPOPER
    AND CAB.DHTIPOPER = TOP.DHALTER
    AND CAB.CODTIPVENDA = TPV.CODTIPVENDA
    AND CAB.DHTIPVENDA = TPV.DHALTER
    AND CAB.CODEMP IN (1,3 )
    AND TRUNC(CAB.DTNEG) BETWEEN '25/set/2023' AND '26/set/2023'
ORDER BY
    CAB.CODEMP,
    CAB.NUNOTA,
    ITE.SEQUENCIA