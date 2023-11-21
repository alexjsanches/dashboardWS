import axios from 'axios';

export function isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
}

export function isHoliday(date: Date, holidays: Date[]): boolean {
    return holidays.some(holiday => holiday.toDateString() === date.toDateString());
}

export interface WorkingDaysResult {
    diasUteisNoMes: number;
    diasFaltantes: number;
}

export async function calculateWorkingDaysIncludingToday(year: number, month: number): Promise<WorkingDaysResult> {
    const today = new Date();
    const lastDay = new Date(year, month + 1, 0);

    try {
        // Faz a requisição para obter as datas ignoradas do backend
        const response = await axios.get('http://localhost:3333/api/dates');
        const ignoredDays: Date[] = response.data.map((date: any) => new Date(date.date));

        let workingDays = 0;
        let currentDay = new Date(today);

        while (currentDay <= lastDay) {
            if (!isWeekend(currentDay) && !isHoliday(currentDay, ignoredDays)) {
                workingDays++;
            }
            currentDay.setDate(currentDay.getDate() + 1);
        }

        const diasFaltantes = workingDays - today.getDate(); // Calcula os dias faltantes

        return { diasUteisNoMes: workingDays, diasFaltantes };
    } catch (error) {
        console.error('Erro ao obter datas ignoradas do backend:', error);
        throw error;
    }
}

// Exemplo de uso
export async function main() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    try {
        const { diasUteisNoMes, diasFaltantes } = await calculateWorkingDaysIncludingToday(year, month);
        console.log(`Dias úteis no mês: ${diasUteisNoMes}`);
        console.log(`Dias faltantes considerando feriados: ${diasFaltantes}`);
    } catch (error) {
        // Tratar erro, se necessário
    }
}
