import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";

const defaultRuleConfig = `# GhostAI Security Rules Configuration
# Configure detection rules for your repositories

rules:
  - name: secret-detection
    enabled: true
    threshold: high
    patterns:
      - type: api_key
        regex: "[A-Za-z0-9]{32,}"
      - type: aws_key
        regex: "AKIA[0-9A-Z]{16}"
    
  - name: pii-detection
    enabled: true
    threshold: medium
    patterns:
      - type: email
        regex: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
      - type: ssn
        regex: "\\d{3}-\\d{2}-\\d{4}"
    
  - name: prompt-injection
    enabled: true
    threshold: high
    detectors:
      - ignore_previous_instructions
      - system_prompt_leak
    
  - name: risky-code
    enabled: false
    threshold: low
    patterns:
      - type: eval
        language: javascript
      - type: exec
        language: python

overrides:
  repositories:
    - name: "test-repo"
      rules:
        - secret-detection: false`;

const Rules = () => {
  const [config, setConfig] = useState(defaultRuleConfig);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleSave = () => {
    toast.success("Rules configuration saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rules</h1>
          <p className="text-muted-foreground">Configure security detection rules</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="rules-enabled"
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
            />
            <Label htmlFor="rules-enabled">Rules Enabled</Label>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Configuration (YAML)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={config}
            onChange={(e) => setConfig(e.target.value)}
            className="font-mono text-sm min-h-[600px] bg-muted/30"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Secret Detection</h3>
              <p className="text-sm text-muted-foreground">
                Enabled • High threshold • 2 patterns
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">PII Detection</h3>
              <p className="text-sm text-muted-foreground">
                Enabled • Medium threshold • 2 patterns
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Prompt Injection</h3>
              <p className="text-sm text-muted-foreground">
                Enabled • High threshold • 2 detectors
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg opacity-60">
              <h3 className="font-semibold mb-2">Risky Code</h3>
              <p className="text-sm text-muted-foreground">
                Disabled • Low threshold • 2 patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
