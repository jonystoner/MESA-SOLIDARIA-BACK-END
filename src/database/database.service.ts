import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {createPool, Pool} from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    //Criamos a propriedade poll, ela representa a conexão com o banco de dados 
    private pool:Pool;

    //o constructor é executado autoamticamente quando o serviço é criado 
    constructor (private configService: ConfigService) {
            this.pool = createPool ({
                host: this.configService.get<string>('DB_HOST'),
                user: this.configService.get<string>('DB_USER'),
                password: this.configService.get<string>('DB_PASSWORD'),
                database: this.configService.get<string>('DB_NAME') 
            })
    }
    
    async query (sql:string , params?: any[]){
        const [resultado] = await this.pool.execute(sql,params)
        return resultado
    }
}
