/**
 * Copyright 2021 leenjewel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "kcpobject.h"

namespace node_kcp {

using v8::Local;
using v8::Object;

void InitModule(Local<Object> exports) { KCPObject::Init(exports); }

NAN_MODULE_WORKER_ENABLED(kcp, InitModule)

}  // namespace node_kcp
