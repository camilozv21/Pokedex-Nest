import { SeedService } from './seed.service';
import { Request } from 'express';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    executeSeed(): Promise<string>;
    getIpInfo(request: Request): Promise<{
        ip: string;
    }>;
}
