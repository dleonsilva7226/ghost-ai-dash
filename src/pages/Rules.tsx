import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, Sparkles, Zap } from "lucide-react";
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

const examplePrompts = [
  "Block if more than 50 lines of code touched in SQL migrations",
  "Alert on any AWS credentials in config files",
  "Detect sensitive customer PII in logs and responses",
  "Flag prompt injection attempts in user inputs",
];

const Rules = () => {
  const [config, setConfig] = useState(defaultRuleConfig);
  const [isEnabled, setIsEnabled] = useState(true);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    toast.success("Rules configuration saved successfully", {
      description: "Your security policies are now active",
    });
  };

  const handleGenerateFromPrompt = () => {
    if (!naturalLanguageInput.trim()) {
      toast.error("Please enter a rule description");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedYaml = `
  - name: custom-rule-${Date.now()}
    enabled: true
    threshold: high
    description: "${naturalLanguageInput}"
    patterns:
      - type: auto_generated
        condition: "${naturalLanguageInput.toLowerCase()}"`;
      
      setConfig(config + "\n" + generatedYaml);
      setNaturalLanguageInput("");
      setIsGenerating(false);
      toast.success("Rule generated!", {
        description: "AI-generated rule added to your configuration",
      });
    }, 1500);
  };

  const toggleRuleAnimation = (ruleName: string) => {
    toast.info(`${ruleName} toggled`, {
      description: "Rule status updated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rules</h1>
          <p className="text-muted-foreground">Configure security detection rules with AI</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="rules-enabled"
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="rules-enabled" className="cursor-pointer">
              Rules {isEnabled ? "Enabled" : "Disabled"}
            </Label>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Natural Language Rule Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Rule Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Describe your security policy in plain English</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Block if more than 50 lines touched in SQL migrations"
                value={naturalLanguageInput}
                onChange={(e) => setNaturalLanguageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerateFromPrompt()}
                className="flex-1 border-primary/30"
              />
              <Button 
                onClick={handleGenerateFromPrompt}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Examples:</span>
            {examplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setNaturalLanguageInput(prompt)}
                className="text-xs px-3 py-1 rounded-full bg-secondary/50 hover:bg-secondary border border-secondary-foreground/20 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* YAML Editor */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Rule Configuration (YAML)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              className="font-mono text-sm min-h-[500px] bg-muted/30"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Rule Summary with Animation */}
      <Card>
        <CardHeader>
          <CardTitle>Active Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Secret Detection", enabled: true, threshold: "high", patterns: 2, color: "critical" },
              { name: "PII Detection", enabled: true, threshold: "medium", patterns: 2, color: "warning" },
              { name: "Prompt Injection", enabled: true, threshold: "high", patterns: 2, color: "warning" },
              { name: "Risky Code", enabled: false, threshold: "low", patterns: 2, color: "safe" },
            ].map((rule, i) => (
              <div
                key={i}
                className={`p-4 border rounded-lg transition-all duration-300 ${
                  rule.enabled 
                    ? `border-${rule.color} bg-${rule.color}/5 hover:shadow-md` 
                    : 'border-border opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{rule.name}</h3>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRuleAnimation(rule.name)}
                    className={rule.enabled ? "data-[state=checked]:bg-primary" : ""}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {rule.enabled ? "Enabled" : "Disabled"} • {rule.threshold} threshold • {rule.patterns} patterns
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
