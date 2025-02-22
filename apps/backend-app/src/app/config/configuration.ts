import * as dotnev from 'dotenv';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { ApplicationConfig } from '@nestjs/core';
import { join } from 'path';

dotnev.config();

export interface ApplicationConfiguration extends ApplicationConfig {
  app: {
    name: string;
    version: string;
    description: string;
    port: number;
    host: string;
    env: string;
    debug: boolean;
    timezone: string;
    locale: string;
    global_prefix: string;
    fallback_locale: string;
    fallback_timezone: string;
    log: string;
    log_level: string;
    log_path: string;
    log_max_files: number;
    log_permission: string;
    log_with_date: boolean;
    log_with_time: boolean;
    log_with_datetime: boolean;
    log_with_microtime: boolean;
    log_with_memory_usage: boolean;
    log_with_memory_peak_usage: boolean;
    log_with_memory_limit: boolean;
    log_with_memory_available: boolean;
    log_with_memory_usage_peak: boolean;
    log_with_memory_usage_peak_percentage: boolean;
    log_with_memory_peak_usage_peak: boolean;
    log_with_memory_peak_usage_peak_percentage: boolean;
    log_with_memory_limit_peak: boolean;
    log_with_memory_limit_peak_percentage: boolean;
    log_with_memory_available_peak: boolean;
  };
  database: {
    host: string;
    port: number;
    name: string;
  };
}


export const parseConfigVars = (object: Record<string, unknown>) => {
  if (!object || typeof object !== 'object') return; // Ensure object is valid

  for (const key in object) {
    if (typeof object[key] === 'object' && object[key] !== null) {
      parseConfigVars(object[key] as Record<string, unknown>); // Recursively process nested objects
    } else if (typeof object[key] === 'string') {
      const match = (object[key] as string).match(/\${(.*?)}/);
      if (match) {
        const envVar = match[1]; // Extract the variable name inside `${}`
        console.log(`Replacing ${key} with ${envVar} = ${process.env[envVar]}`);
        object[key] = process.env[envVar] || object[key]; // Replace with .env value or keep original
      }
    }
  }
};


export default () => {
  const appConfigPath = join(
    process.cwd(),
    'apps/backend-app/src/app/config/application.configuration.yaml'
  );

  if (!fs.existsSync(appConfigPath)) {
    throw new Error(`Configuration file not found: ${appConfigPath}`);
  }

  // Load YAML configuration
  const config = yaml.load(fs.readFileSync(appConfigPath, 'utf8')) as ApplicationConfiguration;
  
  parseConfigVars(config as unknown as Record<string, unknown>); // Parse environment variables
  
  return config;
};
