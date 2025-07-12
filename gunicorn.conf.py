# Gunicorn configuration file for Epic Fitness website

import multiprocessing
import os

# Server socket - UPDATED FOR DEPLOYMENT PLATFORM
bind = "0.0.0.0:8080"  # Changed to match your platform's expectations
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 120
keepalive = 5

# Restart workers after this many requests, with up to 100 random jitter
max_requests = 1000
max_requests_jitter = 100

# Preload app for better performance
preload_app = True

# Logging
accesslog = "-"  # Log to stdout
errorlog = "-"   # Log to stderr
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = "epic_fitness_gunicorn"

# Daemon mode
daemon = False
