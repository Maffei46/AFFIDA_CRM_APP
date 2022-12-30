<template>
    <div id="pratica_provvigioni">
        <form v-if="pratica" @submit="edit">
            <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

            <div class="formName">PROVVIGIONI</div>
            <div class="top">
                <div class="flex">
                    <!-- ANTICIPO TECNICO -->
                    <div class="subsection">
                        <div class="subsectionLabel">ANTICIPO TECNICO</div>
                        <div class="flex">
                            <div class="checkbox">
                                <input type="checkbox" v-model="pratica.anticipo_tecnico.active">
                            </div>
                            <div class="input">
                                <input type="date" v-model="pratica.anticipo_tecnico.data_pagamento.date"
                                    :disabled="!pratica.anticipo_tecnico.active" :required="pratica.anticipo_tecnico.active"
                                >
                                <div class="label">DATA PAGAMENTO</div>
                            </div>
                            <div class="input">
                                <input type="number" min="0" max="100" v-model="pratica.anticipo_tecnico.percentuale"
                                    :disabled="!pratica.anticipo_tecnico.active" :required="pratica.anticipo_tecnico.active"
                                >
                                <div class="label">PERCENTUALE</div>
                            </div>
                        </div>
                    </div>
                    <!-- STORNO -->
                    <div class="subsection">
                        <div class="subsectionLabel">STORNO</div>
                        <div class="flex">
                            <div class="checkbox">
                                <input type="checkbox" v-model="pratica.storno.active">
                            </div>
                            <div class="input">
                                <input type="date" v-model="pratica.storno.data.date" 
                                    :disabled="!pratica.storno.active"
                                >
                                <div class="label">DATA</div>
                            </div>
                        </div>
                    </div>
                    <!-- TRATTENUTA -->
                    <div class="subsection">
                        <div class="subsectionLabel">TRATTENUTA</div>
                        <div class="input">
                            <input type="number" v-model="pratica.trattenuta" min="0" max="100" required>
                            <div class="label">PERCENTUALE</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="div">
            <div class="mostra">
                <div class="checkbox" style="margin-right: 10px;">MOSTRA:</div>
                 
                <div class="checkbox">
                    <input type="checkbox" v-model="show.payin">
                    <div class="label">PAYIN</div>
                </div>
                <div class="checkbox">
                    <input type="checkbox" v-model="show.istruttoria">
                    <div class="label">ISTRUTTORIA</div>
                </div>
                <div class="checkbox">
                    <input type="checkbox" v-model="show.polizza_banca">
                    <div class="label">POLIZZA BANCA</div>
                </div>
                <div class="checkbox">
                    <input type="checkbox" v-model="show.storno">
                    <div class="label">STORNO</div>
                </div>
            </div>
            <div class="mid">
                <!-- PAYIN -->
                <div class="section" v-if="show.payin">
                    <div class="hrSezione">
                        <hr>
                        <div class="titoloSezione">[ PAYIN ]</div>
                    </div>

                    <div class="flex">
                        <!-- PAYIN -->
                        <div class="input">
                            <input type="number" v-model="pratica.payin" required>
                            <div class="label">PAYIN</div>
                        </div>

                        <!-- PAYIN1 -->
                        <div class="input">
                            <div class="fakeInput">{{p = moneyFormat(payin1(pratica.payin,pratica.anticipo_tecnico))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 1</div>
                        </div>

                        <!-- PAYIN2 -->
                        <div class="input">
                            <div class="fakeInput">{{py2 = moneyFormat(payin2(p))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 2</div>
                        </div>
                    </div>

                    <!-- PROVVIGIONI LORDE -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONI LORDE</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{pda = percentualDifference(0,'agente')}}%) - {{provL_a = moneyFormat(py2 * pda / 100)}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{pdtl = percentualDifference(pda,'teamleader')}}%) - {{provL_tl = moneyFormat(py2 * pdtl / 100)}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{pde = percentualDifference(pda+pdtl,'executive')}}%) - {{provL_e = moneyFormat(py2 * pde / 100)}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{pdte = percentualDifference(pda + pdtl + pde,'topexecutive')}}%) - {{provL_te = moneyFormat(py2 * pdte / 100)}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{pdhe = percentualDifference(pda + pdtl + pde + pdte,'headexecutive')}}%) - {{provL_he = moneyFormat(py2 * pdhe / 100)}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{payout_lordo = moneyFormat(provL_a + provL_tl + provL_e + provL_te + provL_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT LORDO</div>
                    </div>

                    <!-- DEALER -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">DEALER</div>    
                    </div>
                    <div class="input">
                        <input type="number" v-model="pratica.dealer.payin" required>
                        <div class="label">DEALER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{dealer_a = moneyFormat(dealer(provL_a,payout_lordo,Number(pratica.dealer.payin)))}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{dealer_tl = moneyFormat(dealer(provL_tl,payout_lordo,Number(pratica.dealer.payin)))}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{dealer_e = moneyFormat(dealer(provL_e,payout_lordo,Number(pratica.dealer.payin)))}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{dealer_te = moneyFormat(dealer(provL_te,payout_lordo,Number(pratica.dealer.payin)))}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input"> 
                        <div class="fakeInput">{{dealer_he = moneyFormat(dealer(provL_he,payout_lordo,Number(pratica.dealer.payin)))}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>

                    <!-- SEGNALA COLLEGA -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">SEGNALA COLLEGA</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{prov_segnala_collega = moneyFormat(segnalaCollega(provL_a - dealer_a))}} €</div>
                        <div class="label fakeInputLabel">PROVVIGIONE</div>
                    </div>

                    <!-- TANDEM -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">TANDEM</div>    
                    </div>
                    <div class="input">
                        <input type="number" min="0" max="100" v-model="pratica.tandem_percentuale_pagamento" required>
                        <div class="label">PERCENTUALE PAGAMENTO</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{tandem_importo = moneyFormat(tandem())}} €</div>
                        <div class="label fakeInputLabel">IMPORTO</div>
                    </div>

                    <!-- PROVVIGIONE NETTA -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONE NETTA</div>    
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            AGENTE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provO_a = moneyFormat(provL_a - dealer_a - prov_segnala_collega - tandem_importo)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.payin.agente" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provN_a = moneyFormat(provO_a + Number(pratica.variazioni.payin.agente))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TEAM LEADER
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provO_tl = moneyFormat(provL_tl - dealer_tl)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.payin.teamLeader" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provN_tl = moneyFormat(provO_tl + Number(pratica.variazioni.payin.teamLeader))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provO_e = moneyFormat(provL_e - dealer_e)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.payin.executive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provN_e = moneyFormat(provO_e + Number(pratica.variazioni.payin.executive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TOP EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provO_te = moneyFormat(provL_te - dealer_te)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.payin.topExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provN_te = moneyFormat(provO_te + Number(pratica.variazioni.payin.topExecutive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            HEAD EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provO_he = moneyFormat(provL_he - dealer_he)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.payin.headExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{provN_he = moneyFormat(provO_he + Number(pratica.variazioni.payin.headExecutive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{payout_netto = moneyFormat(provN_a + provN_tl + provN_e + provN_te + provN_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT NETTO</div>
                    </div>

                    
                </div>
                <!-- ISTRUTTORIA  -->
                <div class="section" v-if="show.istruttoria">
                    <div class="hrSezione">
                        <hr>
                        <div class="titoloSezione">[ ISTRUTTORIA ]</div>
                    </div>
                    <div class="flex">
                        <!-- ISTRUTTORIA -->
                        <div class="input">
                            <input type="number" v-model="pratica.istruttoria" required>
                            <div class="label">ISTRUTTORIA</div>
                        </div>

                        <!-- PAYIN1 -->
                        <div class="input">
                            <div class="fakeInput">{{ISTR_p = moneyFormat(payin1(pratica.istruttoria,pratica.anticipo_tecnico))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 1</div>
                        </div>

                        <!-- PAYIN2 -->
                        <div class="input">
                            <div class="fakeInput">{{ISTR_py2 = moneyFormat(payin2(ISTR_p))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 2</div>
                        </div>
                    </div>

                    <!-- PROVVIGIONI LORDE -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONI LORDE</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{ISTR_pda = percentualDifference(0,'agente')}}%) - {{ISTR_provL_a = moneyFormat(ISTR_py2 * ISTR_pda / 100)}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{ISTR_pdtl = percentualDifference(ISTR_pda,'teamleader')}}%) - {{ISTR_provL_tl = moneyFormat(ISTR_py2 * ISTR_pdtl / 100)}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{ISTR_pde = percentualDifference(ISTR_pda+ISTR_pdtl,'executive')}}%) - {{ISTR_provL_e = moneyFormat(ISTR_py2 * ISTR_pde / 100)}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{ISTR_pdte = percentualDifference(ISTR_pda+ISTR_pdtl+ISTR_pde,'topexecutive')}}%) - {{ISTR_provL_te = moneyFormat(ISTR_py2 * ISTR_pdte / 100)}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{ISTR_pdhe = percentualDifference(ISTR_pda+ISTR_pdtl+ISTR_pde+ISTR_pdte,'headexecutive')}}%) - {{ISTR_provL_he = moneyFormat(ISTR_py2 * ISTR_pdhe / 100)}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{ISTR_payout_lordo = moneyFormat(ISTR_provL_a + ISTR_provL_tl + ISTR_provL_e + ISTR_provL_te + ISTR_provL_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT LORDO</div>
                    </div>

                    <!-- DEALER -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">DEALER</div>    
                    </div>
                    <div class="input">
                        <input type="number" v-model="pratica.dealer.istruttoria" required>
                        <div class="label">DEALER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{ISTR_dealer_a = moneyFormat(dealer(ISTR_provL_a,ISTR_payout_lordo,Number(pratica.dealer.istruttoria)))}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{ISTR_dealer_tl = moneyFormat(dealer(ISTR_provL_tl,ISTR_payout_lordo,Number(pratica.dealer.istruttoria)))}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{ISTR_dealer_e = moneyFormat(dealer(ISTR_provL_e,ISTR_payout_lordo,Number(pratica.dealer.istruttoria)))}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{ISTR_dealer_te = moneyFormat(dealer(ISTR_provL_te,ISTR_payout_lordo,Number(pratica.dealer.istruttoria)))}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{ISTR_dealer_he = moneyFormat(dealer(ISTR_provL_he,ISTR_payout_lordo,Number(pratica.dealer.istruttoria)))}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>

                    <!-- SEGNALA COLLEGA -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">SEGNALA COLLEGA</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{ISTR_prov_segnala_collega = moneyFormat(segnalaCollega(ISTR_provL_a - ISTR_dealer_a))}} €</div>
                        <div class="label fakeInputLabel">PROVVIGIONE</div>
                    </div>

                    <!-- PROVVIGIONE NETTA -->
                    <div class="hr" :style="show.payin?'margin-top: 146px':''">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONE NETTA</div>    
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            AGENTE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provO_a = moneyFormat(ISTR_provL_a - ISTR_dealer_a - ISTR_prov_segnala_collega)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.istruttoria.agente" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provN_a = moneyFormat(ISTR_provO_a + Number(pratica.variazioni.istruttoria.agente))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TEAM LEADER
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provO_tl = moneyFormat(ISTR_provL_tl - ISTR_dealer_tl)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.istruttoria.teamLeader" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provN_tl = moneyFormat(ISTR_provO_tl + Number(pratica.variazioni.istruttoria.teamLeader))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provO_e = moneyFormat(ISTR_provL_e - ISTR_dealer_e)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.istruttoria.executive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provN_e = moneyFormat(ISTR_provO_e + Number(pratica.variazioni.istruttoria.executive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TOP EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provO_te = moneyFormat(ISTR_provL_te - ISTR_dealer_te)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.istruttoria.topExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provN_te = moneyFormat(ISTR_provO_te + Number(pratica.variazioni.istruttoria.topExecutive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            HEAD EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provO_he = moneyFormat(ISTR_provL_he - ISTR_dealer_he)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.istruttoria.headExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{ISTR_provN_he = moneyFormat(ISTR_provO_he + Number(pratica.variazioni.istruttoria.headExecutive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{ISTR_payout_netto = moneyFormat(ISTR_provN_a + ISTR_provN_tl + ISTR_provN_e + ISTR_provN_te + ISTR_provN_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT NETTO</div>
                    </div>
                </div>
                <!-- POLIZA BANCA -->
                <div class="section" v-if="show.polizza_banca">
                    <div class="hrSezione">
                        <hr>
                        <div class="titoloSezione">[ POLIZZA BANCA ]</div>
                    </div>
                    <div class="flex">
                        <!-- POLIZZA BANCA -->
                        <div class="input">
                            <input type="number" v-model="pratica.polizza_banca" required>
                            <div class="label">POLIZZA BANCA</div>
                        </div>

                        <!-- PAYIN1 -->
                        <div class="input">
                            <div class="fakeInput">{{PB_p = moneyFormat(payin1(pratica.polizza_banca,pratica.anticipo_tecnico))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 1</div>
                        </div>

                        <!-- PAYIN2 -->
                        <div class="input">
                            <div class="fakeInput">{{PB_py2 = moneyFormat(payin2(PB_p))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 2</div>
                        </div>
                    </div>

                    <!-- PROVVIGIONI LORDE -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONI LORDE</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{PB_pda = percentualDifference(0,'agente')}}%) - {{PB_provL_a = moneyFormat(PB_py2 * PB_pda / 100)}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{PB_pdtl = percentualDifference(PB_pda,'teamleader')}}%) - {{PB_provL_tl = moneyFormat(PB_py2 * PB_pdtl / 100)}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{PB_pde = percentualDifference(PB_pda+PB_pdtl,'executive')}}%) - {{PB_provL_e = moneyFormat(PB_py2 * PB_pde / 100)}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{PB_pdte = percentualDifference(PB_pda+PB_pdtl+PB_pde,'topexecutive')}}%) - {{PB_provL_te = moneyFormat(PB_py2 * PB_pdte / 100)}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{PB_pdhe = percentualDifference(PB_pda+PB_pdtl+PB_pde+PB_pdte,'headexecutive')}}%) - {{PB_provL_he = moneyFormat(PB_py2 * PB_pdhe / 100)}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{PB_payout_lordo = moneyFormat(PB_provL_a + PB_provL_tl + PB_provL_e + PB_provL_te + PB_provL_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT LORDO</div>
                    </div>

                    <!-- DEALER -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">DEALER</div>    
                    </div>
                    <div class="input">
                        <input type="number" v-model="pratica.dealer.polizza_banca" required>
                        <div class="label">DEALER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{PB_dealer_a = moneyFormat(dealer(PB_provL_a,PB_payout_lordo,Number(pratica.dealer.polizza_banca)))}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{PB_dealer_tl = moneyFormat(dealer(PB_provL_tl,PB_payout_lordo,Number(pratica.dealer.polizza_banca)))}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{PB_dealer_e = moneyFormat(dealer(PB_provL_e,PB_payout_lordo,Number(pratica.dealer.polizza_banca)))}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{PB_dealer_te = moneyFormat(dealer(PB_provL_te,PB_payout_lordo,Number(pratica.dealer.polizza_banca)))}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{PB_dealer_he = moneyFormat(dealer(PB_provL_he,PB_payout_lordo,Number(pratica.dealer.polizza_banca)))}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>

                    <!-- SEGNALA COLLEGA -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">SEGNALA COLLEGA</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{PB_prov_segnala_collega = moneyFormat(segnalaCollega(PB_provL_a - PB_dealer_a))}} €</div>
                        <div class="label fakeInputLabel">PROVVIGIONE</div>
                    </div>

                    <!-- PROVVIGIONE NETTA -->
                    <div class="hr" :style="show.payin?'margin-top: 146px':''">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONE NETTA</div>    
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            AGENTE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provO_a = moneyFormat(PB_provL_a - PB_dealer_a - PB_prov_segnala_collega)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.polizza_banca.agente" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput fakeInputLabel">{{PB_provN_a = moneyFormat(PB_provO_a + Number(pratica.variazioni.polizza_banca.agente))}} €</div>
                            <div class="label">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TEAM LEADER
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provO_tl = moneyFormat(PB_provL_tl - PB_dealer_tl)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.polizza_banca.teamLeader" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provN_tl = moneyFormat(PB_provO_tl + Number(pratica.variazioni.polizza_banca.teamLeader))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provO_e = moneyFormat(PB_provL_e - PB_dealer_e)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.polizza_banca.executive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provN_e = moneyFormat(PB_provO_e + Number(pratica.variazioni.polizza_banca.executive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TOP EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provO_te = moneyFormat(PB_provL_te - PB_dealer_te)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.polizza_banca.topExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provN_te = moneyFormat(PB_provO_te + Number(pratica.variazioni.polizza_banca.topExecutive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            HEAD EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provO_he = moneyFormat(PB_provL_he - PB_dealer_he)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.polizza_banca.headExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{PB_provN_he = moneyFormat(PB_provO_he + Number(pratica.variazioni.polizza_banca.headExecutive))}} €</div>
                            <div class="label fakeInputLabel" >NETTA</div>
                        </div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{PB_payout_netto = moneyFormat(PB_provN_a + PB_provN_tl + PB_provN_e + PB_provN_te + PB_provN_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT NETTO</div>
                    </div>
                </div>
                <!-- STORNO -->
                <div class="section" v-if="show.storno && pratica.storno.active">
                    <div class="hrSezione">
                        <hr>
                        <div class="titoloSezione">[ STORNO ]</div>
                    </div>

                    <div class="flex">
                        <!-- STORNO -->
                        <div class="input">
                            <input type="number" v-model="pratica.storno.importo" required>
                            <div class="label">STORNO</div>
                        </div>

                        <!-- PAYIN1 -->
                        <div class="input">
                            <div class="fakeInput">{{STRN_p = moneyFormat(payin1(pratica.storno.importo,pratica.anticipo_tecnico))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 1</div>
                        </div>

                        <!-- PAYIN2 -->
                        <div class="input">
                            <div class="fakeInput">{{STRN_py2 = moneyFormat(payin2(STRN_p))}} €</div>
                            <div class="label fakeInputLabel">PAYIN 2</div>
                        </div>
                    </div>

                    <!-- PROVVIGIONI LORDE -->
                    <div class="hr">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONI LORDE</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{STRN_pda = percentualDifference(0,'agente')}}%) - {{STRN_provL_a = moneyFormat(STRN_py2 * STRN_pda / 100)}} €</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{STRN_pdtl = percentualDifference(STRN_pda,'teamleader')}}%) - {{STRN_provL_tl = moneyFormat(STRN_py2 * STRN_pdtl / 100)}} €</div>
                        <div class="label fakeInputLabel">TEAM LEADER</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{STRN_pde = percentualDifference(STRN_pda+STRN_pdtl,'executive')}}%) - {{STRN_provL_e = moneyFormat(STRN_py2 * STRN_pde / 100)}} €</div>
                        <div class="label fakeInputLabel">EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{STRN_pdte = percentualDifference(STRN_pda+STRN_pdtl+STRN_pde,'topexecutive')}}%) - {{STRN_provL_te = moneyFormat(STRN_py2 * STRN_pdte / 100)}} €</div>
                        <div class="label fakeInputLabel">TOP EXECUTIVE</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">({{STRN_pdhe = percentualDifference(STRN_pda+STRN_pdtl+STRN_pde+STRN_pdte,'headexecutive')}}%) - {{STRN_provL_he = moneyFormat(STRN_py2 * STRN_pdhe / 100)}} €</div>
                        <div class="label fakeInputLabel">HEAD EXECUTIVE</div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{STRN_payout_lordo = moneyFormat(STRN_provL_a + STRN_provL_tl + STRN_provL_e + STRN_provL_te + STRN_provL_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT LORDO</div>
                    </div>

                    <!-- SEGNALA COLLEGA -->
                    <div class="hr" :style="show.payin||show.istruttoria||show.polizza_banca?'margin-top: 314px':''">
                        <hr class="hrLine">
                        <div class="hrTitle">SEGNALA COLLEGA</div>    
                    </div>
                    <div class="input">
                        <div class="fakeInput">{{STRN_prov_segnala_collega = moneyFormat(segnalaCollega(STRN_provL_a - STRN_dealer_a))}} €</div>
                        <div class="label fakeInputLabel">PROVVIGIONE</div>
                    </div>


                    <!-- PROVVIGIONE NETTA -->
                    <div class="hr" :style="show.payin?'margin-top: 146px':''">
                        <hr class="hrLine">
                        <div class="hrTitle">PROVVIGIONE NETTA</div>    
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            AGENTE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provO_a = -moneyFormat(STRN_provL_a - STRN_prov_segnala_collega)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.trattenuta.agente" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provN_a = moneyFormat(STRN_provO_a + Number(pratica.variazioni.trattenuta.agente))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TEAM LEADER
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provO_tl = -moneyFormat(STRN_provL_tl)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.trattenuta.teamLeader" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provN_tl = moneyFormat(STRN_provO_tl + Number(pratica.variazioni.trattenuta.teamLeader))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provO_e = -moneyFormat(STRN_provL_e)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.trattenuta.executive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provN_e = moneyFormat(STRN_provO_e + Number(pratica.variazioni.trattenuta.executive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            TOP EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provO_te = -moneyFormat(STRN_provL_te)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.trattenuta.topExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provN_te = moneyFormat(STRN_provO_te + Number(pratica.variazioni.trattenuta.topExecutive))}} €</div>
                            <div class="label fakeInputLabel">NETTA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input titl">
                            HEAD EXECUTIVE
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provO_he = -moneyFormat(STRN_provL_he)}} €</div>
                            <div class="label fakeInputLabel">OPERATIVA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.variazioni.trattenuta.headExecutive" required>
                            <div class="label">VARIAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{STRN_provN_he = moneyFormat(STRN_provO_he + Number(pratica.variazioni.trattenuta.headExecutive))}} €</div>
                            <div class="label fakeInputLabel" >NETTA</div>
                        </div>
                    </div>
                    <div class="input RESULT">
                        <div class="fakeInput">{{STRN_payout_netto = moneyFormat(STRN_provN_a + STRN_provN_tl + STRN_provN_e + STRN_provN_te + STRN_provN_he)}} €</div>
                        <div class="label fakeInputLabel">PAYOUT NETTO</div>
                    </div>
                </div>
            </div>
            <button type="submit" style="margin-top:50px">MODIFICA</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props:['pratica'],
    data() {
        return {
            loading:false,
            show:{
                payin:true,
                istruttoria:false,
                polizza_banca:false,
                storno:false,
            },
            payins1:{
                payin:0,
            }
        }
    },
    methods:{
        ...mapActions(['pratiche_edit']),
        payin1(payin,anticipo_tecnico){
            var payin1 = payin;
            if(anticipo_tecnico.active){
                if(!anticipo_tecnico.data_pagamento){
                    payin1 = (payin * anticipo_tecnico.percentuale) / 100;
                }else{
                    payin1 = (payin * (100-anticipo_tecnico.percentuale)) / 100;
                }
            }
            this.payins1.payin = payin1;
            return payin1;
        },
        payin2(payin1){
            var payin2 = payin1;
            if(this.pratica.campagna){
                payin2 = (payin1 * this.pratica.campagna.percentual) / 100;
            }else{
                payin2 = (payin1 - (payin1 * this.pratica.trattenuta / 100))
            }
            return payin2;
        },
        percentuale(who){
            function parsePercentual(string){
                var res = Number(string.replace(/%/g, ''));
                if(isNaN(res)) return -1;
                return res;
            }

            var field = 'percMutui';
            if(this.pratica.tipo == 'Cessione del Quinto') field = 'percCDQ';
            if(this.pratica.tipo == 'Mutuo Immobile') field = 'percMutui';
            
            if(who == 'agente') return parsePercentual(this.pratica.agente[field]);

            if(who == 'teamleader'){
                if(!this.pratica.agente.teamLeader) return -1;
                var teamLeader = this.agenteByID(this.pratica.agente.teamLeader);
                //console.log('teamLeader',teamLeader)
                if(!teamLeader) return -1;
                if(teamLeader.figura != 'Team Leader') return -1;
                return parsePercentual(teamLeader[field]);
            }
            if(who == 'executive'){
                if(!this.pratica.agente.executive) return -1;
                var executive = this.agenteByID(this.pratica.agente.executive);
                //console.log('executive',executive)
                if(!executive) return -1;
                if(executive.figura != 'Executive') return -1;
                return parsePercentual(executive[field]);
            }
            if(who == 'topexecutive'){
                if(!this.pratica.agente.topExecutive) return -1;
                var topexecutive = this.agenteByID(this.pratica.agente.topExecutive);
                //console.log('topexecutive',topexecutive)
                if(!topexecutive) return -1;
                if(topexecutive.figura != 'Top Executive') return -1;
                return parsePercentual(topexecutive[field]);
            }
            if(who == 'headexecutive'){
                if(!this.pratica.agente.headExecutive) return -1;
                var headexecutive = this.agenteByID(this.pratica.agente.headExecutive);
                //console.log('headexecutive',headexecutive)
                if(!headexecutive) return -1;
                if(headexecutive.figura != 'Head Executive') return -1;
                return parsePercentual(headexecutive[field]);
            }
        },
        percentualDifference(start,who){

            var perce = this.percentuale(who);
            if(perce == -1) return Number(0);
            
            return Number(Math.abs(start - perce));
        },
        dealer(prov,payout_lordo,dealer){
            if(payout_lordo==0) return 0;
            return (prov / payout_lordo)  * dealer;
        },
        segnalaCollega(val){
            if(!this.pratica.segnalaCollega) return 0;
            if(!this.pratica.segnalaCollega.agente) return 0;
            if(!this.pratica.segnalaCollega.percentuale) return 0;
            return (val * this.pratica.segnalaCollega.percentuale ) / 100;
        },
        tandem(){
            if(!this.pratica.tandem) return 0;
            if(!this.pratica.tandem.importo) return 0;
            var val = (this.pratica.tandem.importo * this.pratica.tandem_percentuale_pagamento) / 100;
            if(isNaN(val)) return 0;
            return val;
        },
        moneyFormat(val){
            return Number(parseFloat(val).toFixed(2));
        },
        formatDateForUS(date){
            var d = new Date(date);
            var day = d.getDate();
            var month = d.getMonth()+1;
            var year = d.getFullYear();
            return `${year}-${month}-${day}`;
        },

        edit(e){
            e.preventDefault();
            this.loading = true;
            this.pratiche_edit(this.pratica).then(()=>{
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Pratica Modificata',
                    duration: 4000,
                });
                this.loading = false;
            })
        }
    },
    computed: mapGetters(['agenteByID']),
    mounted(){
        if(this.pratica.anticipo_tecnico.data_pagamento.date){
            this.pratica.anticipo_tecnico.data_pagamento.date = this.formatDateForUS(this.pratica.anticipo_tecnico.data_pagamento.date);
        }
        if(this.pratica.storno.data.date){
            this.pratica.storno.data.date = this.formatDateForUS(this.pratica.storno.data.date);
        }
        console.log('pratica',this.pratica);
        
    }
}
</script>

<style lang="scss" scoped>
#pratica_provvigioni{
    padding-bottom: 10vh;
    padding-left: 15px;
    padding-right: 15px;
}
form{
    max-width: 1800px;
}
.top{
    .flex{
        .subsection{
            width: 50%;
            margin-bottom: 0px;
        }
    }
}
hr.div{
    margin: 10px;
    opacity: 0.4;
}
.subsection{
    border: 1px solid rgb(162, 162, 162);
    border-radius: 4px;
    padding: 0px 10px;
    position: relative;
    padding-top: 20px;
    margin-bottom: 15px;
    .subsectionLabel{
        position: absolute;
        top:-8px;
        left:50%;
        transform: translateX(-50%);
        font-size: 10pt;
        background-color: var(--mainBGColor);
        padding: 0px 10px;
        font-weight: 700;
        color:rgb(162, 162, 162);
    }
}
.flex{
    display: flex;
    column-gap: 10px;
    .input{width: 100%}
    
    .titl{
        max-width: 150px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 12px;
        font-size: 10pt;
    }
}

.mostra{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--Color3);
    width: max-content;
    padding: 15px 20px 0px 20px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.mid{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;

    .fakeInput{
        border: 1px solid rgb(162, 162, 162);
        border-radius: 4px;
        height: 27px;
        line-height: 27px;
        padding-left: 5px;
        font-size: 13.3333px;
        color: rgb(162, 162, 162);
        span{
            color: rgb(162, 162, 162);
        }
    }
    .fakeInputLabel{
        color: rgb(162, 162, 162)!important;
    }
    .section{
        width: 100%;
        max-width: 700px;
        .hrSezione{
            position: relative;
            margin-bottom: 20px;
            .titoloSezione{
                position: absolute;
                top:-9px;
                left:50%;
                transform: translateX(-50%);
                background-color: var(--mainBGColor);
                padding: 0px 10px;
                font-weight: 700;
            }
        }

        .hr{
            position: relative;
            margin-top: 30px;
            .hrLine{
            opacity: 0.5;
            }
            .hrTitle{
                position: absolute;
                left: 50%;
                transform: translateY(-24px) translateX(-50%);
                font-size: 10pt;
                background-color: var(--mainBGColor);
                padding: 0px 10px;
            }
        }

    }
    .RESULT{
        font-weight: 700;
        
        .fakeInput{
            font-size: 14pt;
            width: max-content;
            padding: 0px 20px;
            min-width: 120px;
            margin: 0 auto;
        }
        .label{
            left: 50%;
            transform: translateX(-50%);
        }
        text-align: center;
    }
}

.loading{
    left:0;
}
</style>